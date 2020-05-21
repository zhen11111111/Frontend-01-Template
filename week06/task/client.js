const net = require("net");
const parser = require("./parser.js");

class Request {
  //method, url = host + posrt + path
  //body: k/v
  //headers
  constructor(options) {
    this.method = options.method || "GET";
    this.host = options.host;
    this.port = options.port || 80;
    this.path = options.path || "/";
    this.body = options.body || {};
    this.headers = options.headers || {};
    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    if (this.headers["Content-Type"] === "application/json") {
      this.bodyText = JSON.stringify(this.body);
    } else if (
      this.headers["Content-Type"] === "application/x-www-form-urlencoded"
    ) {
      this.bodyText = Object.keys(this.body)
        .map((key) => `${key}=${encodeURIComponent(this.body[key])}`)
        .join("&");
    }
    this.headers["Content-Length"] = this.bodyText.length;
  }
  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r\n${Object.keys(this.headers)
      .map((key) => `${key}: ${this.headers[key]}`)
      .join("\r\n")}\r\n\r\n${this.bodyText}`;
  }
  send(connection) {
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser();
      if (connection) {
        connection.write(this.toString());
      } else {
        connection = net.createConnection(
          {
            host: this.host,
            port: this.port,
          },
          () => {
            connection.write(this.toString());
          }
        );
      }
      connection.on("data", (data) => {
        parser.receive(data.toString());
        // resolve(data.toString());
        if (parser.isFinished) {
          resolve(parser.getResponse());
        }
        connection.end();
      });

      connection.on("error", (data) => {
        resolve(data.toString());
        connection.end();
      });
    });
  }
}

class Response {}

class ResponseParser {
  constructor() {
    this.WAITTING_STATUS_LINE = 0;
    this.WAITTING_STATUS_LINE_END = 1;
    this.WAITTING_HEADER_NAME = 2;
    this.WAITTING_HEADER_SPACE = 3;
    this.WAITTING_HEADER_VALUE = 4;
    this.WAITTING_HEADER_LINE_END = 5;
    this.WAITTING_HEADER_BLOCK_END = 6;
    this.WAITTING_BODY = 7;

    this.current = this.WAITTING_STATUS_LINE;
    this.statusLine = "";
    this.headers = {};
    this.headerName = "";
    this.headerValue = "";
    this.bodyParser = null;
  }

  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished;
  }

  getResponse() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join(""),
    };
  }

  receive(string) {
    for (let i = 0; i < string.length; i++) {
      this.recevieChar(string.charAt(i));
    }
  }
  recevieChar(char) {
    if (this.current === this.WAITTING_STATUS_LINE) {
      if (char === "\r") {
        this.current = this.WAITTING_STATUS_LINE_END;
      } else if (char === "\n") {
        this.current = this.WAITTING_HEADER_NAME;
      } else {
        this.statusLine += char;
      }
    } else if (this.current === this.WAITTING_STATUS_LINE_END) {
      if (char === "\n") {
        this.current = this.WAITTING_HEADER_NAME;
      }
    } else if (this.current === this.WAITTING_HEADER_NAME) {
      if (char === ":") {
        this.current = this.WAITTING_HEADER_SPACE;
      } else if (char === "\r") {
        this.current = this.WAITTING_HEADER_BLOCK_END;
        if ((this.headers["Transfer-Encoding"] = "chunked")) {
          this.bodyParser = new TrunkedBodyParser();
        }
      } else {
        this.headerName += char;
      }
    } else if (this.current === this.WAITTING_HEADER_SPACE) {
      if (char === " ") {
        this.current = this.WAITTING_HEADER_VALUE;
      }
    } else if (this.current === this.WAITTING_HEADER_VALUE) {
      if (char === "\r") {
        this.current = this.WAITTING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerValue;
        this.headerName = "";
        this.headerValue = "";
      } else {
        this.headerValue += char;
      }
    } else if (this.current === this.WAITTING_HEADER_LINE_END) {
      if (char === "\n") {
        this.current = this.WAITTING_HEADER_NAME;
      }
    } else if (this.current === this.WAITTING_HEADER_BLOCK_END) {
      if (char === "\n") {
        this.current = this.WAITTING_BODY;
      }
    } else if (this.current === this.WAITTING_BODY) {
      this.bodyParser.recevieChar(char);
    }
  }
}

class TrunkedBodyParser {
  constructor() {
    this.WATTING_LENGTH = 0;
    this.WATTING_LENGTH_LINE_END = 1;
    this.READING_TRUNK = 2;
    this.WATTING_NEW_LINE = 3;
    this.WATTING_NEW_LINE_END = 4;
    this.length = 0;
    this.content = [];
    this.isFinished = false;
    this.current = this.WATTING_LENGTH;
  }
  recevieChar(char) {
    if (this.current === this.WATTING_LENGTH) {
      if (char === "\r") {
        if (this.length === 0) {
          this.isFinished = true;
        }
        this.current = this.WATTING_LENGTH_LINE_END;
      } else {
        this.length *= 16;
        this.length += parseInt(char, 16);
        if (this.length === 0) {
          this.current = this.WATTING_NEW_LINE;
        }
      }
    } else if (this.current === this.WATTING_LENGTH_LINE_END) {
      if (this.isFinished) {
        this.current = this.WATTING_NEW_LINE;
      } else if (char === "\n") {
        this.current = this.READING_TRUNK;
      }
    } else if (this.current === this.READING_TRUNK) {
      this.content.push(char);
      this.length--;
      if (this.length === 0) {
        this.current = this.WATTING_NEW_LINE;
      }
    } else if (this.current === this.WATTING_NEW_LINE) {
      if (char === "\r") {
        this.current = this.WATTING_NEW_LINE_END;
      }
    } else if (this.current === this.WATTING_NEW_LINE_END) {
      if (char === "\n") {
        this.current = this.WATTING_LENGTH;
      }
    }
  }
}

void (async function () {
  let request = new Request({
    method: "POST",
    host: "127.0.0.1",
    port: "8088",
    path: "/",
    headers: {
      ["X-Foo2"]: "customed",
    },
    body: {
      name: "Peter",
    },
  });
  let response = await request.send();

  let dom = parser.parseHTML(response.body);
})();
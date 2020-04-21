作业：编写一个 UTF-8 Encoding 的函数

方法：某一个字符串对应UTF-8编码的字节序列，可在服务端语言，如C#中通过 System.Text.Encoding.UTF8.GetString(bytes) 方法将字节序列解码为相应的字符串。
function encodeUtf8(text) {
    const code = encodeURIComponent(text);
    const bytes = [];
    for (var i = 0; i < code.length; i++) {
        const c = code.charAt(i);
        if (c === '%') {
            const hex = code.charAt(i + 1) + code.charAt(i + 2);
            const hexVal = parseInt(hex, 16);
            bytes.push(hexVal);
            i += 2;
        } else bytes.push(c.charCodeAt(0));
    }
    return bytes;
}
而对应的，将以UTF-8编码的字节序列解码为String的JavaScript方法为：
function decodeUtf8(bytes) {
    var encoded = "";
    for (var i = 0; i < bytes.length; i++) {
        encoded += '%' + bytes[i].toString(16);
    }
    return decodeURIComponent(encoded);
}

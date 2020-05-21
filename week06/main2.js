// match abcabcx

const match = (str) => {
  let state = start;
  for (let c of str) {
    state = state(c);
  }
  return state === end;
};

const end = (c) => {
  return end;
};

const start = (c) => {
  if (c === "a") {
    return foundA;
  } else {
    return start;
  }
};

const foundA = (c) => {
  if (c === "b") {
    return foundB;
  } else {
    return start(c);
  }
};

const foundB = (c) => {
  if (c === "c") {
    return foundC;
  } else {
    return start(c);
  }
};

const foundC = (c) => {
  if (c === "a") {
    return foundA2;
  } else {
    return start(c);
  }
};

const foundA2 = (c) => {
  if (c === "b") {
    return foundB2;
  } else {
    return start(c);
  }
};

const foundB2 = (c) => {
  if (c === "x") {
    return end;
  } else {
    return foundB(c);
  }
};
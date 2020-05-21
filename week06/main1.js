const findA = (str) => {
  for (let c of str) {
    if (c === "a") {
      return true;
    }
  }
  return false;
};
findA("I have a");
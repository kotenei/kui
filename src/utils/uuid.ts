const S4 = () => {
  // tslint:disable-next-line: no-bitwise
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

export const uuid = (prefix = '') => {
  return prefix + S4() + [S4(), S4(), S4(), S4(), S4()].join('-') + S4() + S4();
};

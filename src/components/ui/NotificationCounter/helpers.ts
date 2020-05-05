export const getIndentLength = (count: number) =>
  (count.toString().length >= 2 && count > 10 ? 3 : count.toString().length);

export const indent = {
  1: 25,
  2: 27,
  3: 20
};

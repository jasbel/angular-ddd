export const generateArray = (n: number) => {
  let out = Array.from(Array(n), (_, x) => x);
  return out;
};

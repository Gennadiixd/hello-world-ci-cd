export const isServer = () => typeof window === "undefined";

export const getPageNumbers = (
  currentNumber,
  totalPages = Infinity,
  buttonsQuantity
): any => {
  if (currentNumber > totalPages) return [1];
  let leftNumbers = Math.ceil(buttonsQuantity / 2);
  let rightNumbers = Math.ceil(buttonsQuantity / 2);
  const pagesLeft = [];
  const pagesRight = [];

  for (let i = currentNumber - 1; i > currentNumber - leftNumbers; i--) {
    if (i > 0) pagesLeft.unshift(i);
    else rightNumbers++;
  }

  for (let i = currentNumber + 1; i < currentNumber + rightNumbers; i++) {
    if (i <= totalPages) pagesRight.push(i);
    else pagesLeft.unshift(pagesLeft[0] - 1);
  }

  return { pagesLeft, pagesRight };
};

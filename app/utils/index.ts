export const isServer = () => typeof window === "undefined";

export const chunk = (arr, n) => {
  const chunked = [];

  for (let i = 0; i < arr.length; i += n) {
    const chunk = [];
    for (let j = 0; j < n; j++) {
      if (!arr[i + j]) break;
      chunk.push(arr[i + j]);
    }
    chunked.push(chunk);
  }

  return chunked;
};

export const getPageNumbers = (current: number, num: number) => {
  const pages = [];
  let leftNumbers = Math.ceil(num / 2);
  let rightNumbers = Math.ceil(num / 2);

  for (let i = current - 1; i > current - leftNumbers; i--) {
    if (i > 0) pages.push(i);
    else rightNumbers++;
  }

  for (let i = current; i < current + rightNumbers; i++) {
    pages.push(i);
  }

  return pages.sort((a, b) => a - b);
};

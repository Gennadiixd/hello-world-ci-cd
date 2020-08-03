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

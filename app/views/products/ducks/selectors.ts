export const getProductsSelector = (state) => state.products.products;
export const getProductsPageSelector = (page, state) =>
  state.products.pages[page];
export const getCurrentProductSelector = (state) =>
  state.products.currentProduct;

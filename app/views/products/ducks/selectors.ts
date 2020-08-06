export const getProductsSelector = (state) => state.products;

export const getProductsPageSelector = (page, state) =>
  getProductsSelector(state).pages[page];

export const getCurrentProductSelector = (state) =>
  getProductsSelector(state).currentProduct;
  
export const getProductsPaginationSelector = (state) => ({
  totalPages: getProductsSelector(state).totalPages,
  totalCount: getProductsSelector(state).totalCount,
});

import * as AT from "./action-types";
import cloneDeep from "lodash/cloneDeep";

export const initialState = {
  currentProduct: {},
  pages: {},
  totalCount: 0,
  totalPages: 0,
};

export const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AT.SET_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case AT.SET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: payload,
      };
    case AT.SET_PRODUCTS_PAGE:
      const { pageNumber, products, totalCount, totalPages } = payload;
      const pagesState = cloneDeep(state);
      
      pagesState.pages[pageNumber] = products;
      pagesState.totalCount = totalCount;
      pagesState.totalPages = totalPages;

      return {
        ...state,
        ...pagesState,
      };
    default:
      return state;
  }
};

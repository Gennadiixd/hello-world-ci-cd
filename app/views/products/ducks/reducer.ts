import * as AT from "./action-types";
import cloneDeep from "lodash/cloneDeep";

export const initialState = {
  products: [],
  currentProduct: {},
  pages: {},
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
      const { pageNumber, productsPage } = payload;
      const pagesState = cloneDeep(state);
      pagesState.pages[pageNumber] = productsPage;

      return {
        ...state,
        ...pagesState,
      };
    default:
      return state;
  }
};

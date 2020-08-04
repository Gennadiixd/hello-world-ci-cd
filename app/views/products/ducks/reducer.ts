import * as AT from "./action-types";
import update from "lodash/update";

export const initialState = {
  products: [],
  currentProduct: {},
  pages: [],
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
      return {
        ...state,
        pages: update(state.pages, payload.pageNumber, payload.pageItems),
      };
    default:
      return state;
  }
};

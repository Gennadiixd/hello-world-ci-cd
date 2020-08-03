import * as AT from "./action-types";

export const initialState = {
  products: [],
  currentProduct: {},
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
    default:
      return state;
  }
};

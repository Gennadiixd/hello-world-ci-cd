import * as AT from "./action-types";

export const initialState = [];

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AT.ADD_TO_CART:
      return [...state, payload];
    case AT.REMOVE_FROM_CART:
      return state.filter((product) => product !== payload.id);
    default:
      return state;
  }
};

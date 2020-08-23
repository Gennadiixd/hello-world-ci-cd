import * as AT from "./action-types";

export const addToCartAC = (payload) => ({
  type: AT.ADD_TO_CART,
  payload,
});

export const removeFromCart = (payload) => ({
  type: AT.REMOVE_FROM_CART,
  payload,
});

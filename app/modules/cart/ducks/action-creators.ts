import * as AT from "./action-types";

export const addToCartAC = (payload) => ({
  type: AT.ADD_TO_CART,
  payload,
});

export const removeFromCartAC = (payload) => ({
  type: AT.REMOVE_FROM_CART,
  payload,
});

export const setCartStateAC = (payload) => ({
  type: AT.SET_CART_STATE,
  payload,
});

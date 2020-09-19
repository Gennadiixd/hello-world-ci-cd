export const getCartStateSelector = (state) => state.cart;

export const getCartItemsSelector = (state) =>
  Object.values(getCartStateSelector(state).items);

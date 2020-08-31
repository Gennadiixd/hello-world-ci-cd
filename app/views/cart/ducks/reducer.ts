import * as AT from "./action-types";

const removeFromStore = (prop) => ({ [prop]: _, ...store }) => store;

export const initialState = { totalCount: 0, totalPrice: 0, items: {} };

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AT.ADD_TO_CART:
      return state.items[payload.id]
        ? {
            ...state,
            items: {
              ...state.items,
              [payload.id]: {
                ...state.items[payload.id],
                count: state.items[payload.id].count + 1,
              },
            },
            totalCount: state.totalCount + 1,
            totalPrice: state.totalPrice + payload.price,
          }
        : {
            ...state,
            items: {
              ...state.items,
              [payload.id]: { ...payload, count: 1 },
            },
            totalCount: state.totalCount + 1,
            totalPrice: state.totalPrice + payload.price,
          };
    case AT.REMOVE_FROM_CART:
      return state.items[payload.id].count > 1
        ? {
            ...state,
            items: {
              ...state.items,
              [payload.id]: {
                ...state.items[payload.id],
                count: state.items[payload.id].count - 1,
              },
            },
            totalPrice: state.totalPrice - payload.price,
            totalCount: state.totalCount - 1,
          }
        : {
            ...state,
            items: {
              ...removeFromStore(payload.id)(state.items),
            },
            totalPrice: state.totalPrice - payload.price,
            totalCount: state.totalCount - 1,
          };
    case AT.CLEAR_CART:
      return initialState;
    case AT.SET_CART_STATE:
      return payload;
    case AT.SET_CHECKOUT_ERROR:
      return { ...state, ...payload };
    default:
      return state;
  }
};

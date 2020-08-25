import * as AT from "./action-types";

export const initialState = {
  currentUser: {},
  error: {},
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AT.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload || initialState.currentUser,
        error: initialState.error,
      };
    case AT.SET_CURRENT_USER_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

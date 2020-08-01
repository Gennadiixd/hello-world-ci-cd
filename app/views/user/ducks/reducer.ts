import * as AT from "./action-types";

export const initialState = {
  currentUser: {},
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AT.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload || initialState.currentUser,
      };
    default:
      return state;
  }
};

import UsersService from "@/services/users-service";

import * as AT from "./action-types";

const usersService = new UsersService({});

export const setCurrentUserAC = (payload) => ({
  type: AT.SET_CURRENT_USER,
  payload,
});

export const getCurrentUserAC = (payload) => ({
  type: AT.GET_CURRENT_USER,
  payload,
});

export const loginCurrentUserAC = (userData) => async (dispatch) => {
  try {
    const user = await usersService.loginUser(userData);

    return dispatch({
      type: AT.SET_CURRENT_USER,
      payload: user,
    });
  } catch (err) {
    return dispatch({
      type: AT.SET_CURRENT_USER_ERROR,
      payload: err,
    });
  }
};

export const loginCurrentUserByCookieAC = (token?: string) => async (
  dispatch
) => {
  try {
    const user = await usersService.loginUserByCookie(token);

    return dispatch({
      type: AT.SET_CURRENT_USER,
      payload: user,
    });
  } catch (err) {
    return dispatch({
      type: AT.SET_CURRENT_USER,
      payload: err,
    });
  }
};

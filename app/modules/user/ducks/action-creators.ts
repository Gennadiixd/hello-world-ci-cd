import UsersService from "@/lib/services/users-service";

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

const setCurrentUserFlow = async (getUser, dispatch) => {
  try {
    const user = await getUser();

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

export const loginCurrentUserAC = (userData) => async (dispatch) => {
  return setCurrentUserFlow(() => usersService.loginUser(userData), dispatch);
};

export const restoreSessionAC = (token?: string) => async (
  dispatch
) => {
  return setCurrentUserFlow(() => usersService.restoreSession(token), dispatch);
};

export const logoutCurrentUserAC = () => async (dispatch) => {
  return setCurrentUserFlow(() => usersService.logoutUser(), dispatch);
};

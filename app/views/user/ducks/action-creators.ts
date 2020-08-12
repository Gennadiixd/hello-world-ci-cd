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

const userFlow = async (getUser, dispatch) => {
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
  return userFlow(() => usersService.loginUser(userData), dispatch);
  // try {
  //   const user = await usersService.loginUser(userData);

  //   return dispatch({
  //     type: AT.SET_CURRENT_USER,
  //     payload: user,
  //   });
  // } catch (err) {
  //   return dispatch({
  //     type: AT.SET_CURRENT_USER_ERROR,
  //     payload: err,
  //   });
  // }
};

export const loginCurrentUserByCookieAC = (token?: string) => async (
  dispatch
) => {
  return userFlow(() => usersService.loginUserByCookie(token), dispatch);
  // try {
  //   const user = await usersService.loginUserByCookie(token);

  //   return dispatch({
  //     type: AT.SET_CURRENT_USER,
  //     payload: user,
  //   });
  // } catch (err) {
  //   return dispatch({
  //     type: AT.SET_CURRENT_USER_ERROR,
  //     payload: err,
  //   });
  // }
};

export const logoutCurrentUserAC = () => async (dispatch) => {
  return userFlow(() => usersService.logoutUser(), dispatch);
  // try {
  //   await usersService.logoutUser();

  //   return dispatch({
  //     type: AT.SET_CURRENT_USER,
  //     payload: {},
  //   });
  // } catch (err) {
  //   return dispatch({
  //     type: AT.SET_CURRENT_USER_ERROR,
  //     payload: err,
  //   });
  // }
};

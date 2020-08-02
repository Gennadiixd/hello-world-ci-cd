import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import useClaims from "./use-claims";
import { setCurrentUserAC } from "../../views/user/ducks";
import Router from "next/router";

export default function useAllowed({ forRole, redirectTo }) {
  const dispatch = useDispatch();
  const claims = useClaims();

  const handleLogoutUser = () => {
    dispatch(setCurrentUserAC(null));
  };
  const handleRedirect = () => {
    Router.push(`/${redirectTo}`);
  };

  useLayoutEffect(() => {
    if (claims) {
      if (claims.role !== forRole) {
        handleRedirect();
      }
    } else {
      handleLogoutUser();
    }
  }, [claims]);

  return claims?.role === forRole;
}

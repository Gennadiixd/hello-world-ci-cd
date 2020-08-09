import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import Router from "next/router";

import { setCurrentUserAC } from "@/views/user/ducks";

import getClaims from "./get-claims";

export default function useAllowed({ forRole, redirectTo }) {
  const dispatch = useDispatch();
  const { claims } = getClaims({});

  const handleRedirect = () => {
    Router.push(`/${redirectTo}`);
  };
  const handleLogoutUser = () => {
    dispatch(setCurrentUserAC(null));
    handleRedirect();
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

import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import useClaims from "./use-claims";
import { setCurrentUserAC } from "../../views/user/ducks";
import Router from "next/router";

export default function useAllowed({ forRole, redirectTo }) {
  const dispatch = useDispatch();
  const claims = useClaims();
  const handleUserLogout = () => {
    dispatch(setCurrentUserAC(null));
  };

  useLayoutEffect(() => {
    if (!claims) {
      handleUserLogout();
    }
    if (claims?.role !== forRole) {
      Router.push(`/${redirectTo}`);
    }
  }, [claims]);

  return claims?.role === forRole;
}

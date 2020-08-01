import Router from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUserAC } from "@/views/user/ducks/action-creators";

import useClaims from "./use-claims";

export default function AdminRoute(Component) {
  return (...args) => {
    const dispatch = useDispatch();
    const claims = useClaims();
    const handleUserLogout = () => {
      dispatch(setCurrentUserAC(null));
    };

    useEffect(() => {
      if (claims?.role !== "admin") {
        Router.push("/user");
        handleUserLogout();
      }
    }, [claims]);

    return <Component {...args} />;
  };
}

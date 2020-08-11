import React, { Component } from "react";

import { loginCurrentUserByCookieAC } from "@/views/user/ducks";
import { initializeStore } from "@/ducks/index";

import getClaims from "./get-claims";
import useRedirect from "./use-redirect";

export function privateRoute(WrappedComponent: any) {
  return class extends Component {
    static async getInitialProps(ctx: any) {
      const reduxStore = initializeStore({});
      const { dispatch } = reduxStore;

      const { token } = getClaims(ctx);
      if (!token) useRedirect(ctx);

      await dispatch(loginCurrentUserByCookieAC(token));

      const { user } = reduxStore.getState();

      return { initialReduxState: { user } };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

import ServerCookie from "next-cookies";
import React, { Component } from "react";
import { isServer } from "@/utils";

export function privateRoute(WrappedComponent: any) {
  return class extends Component {
    static async getInitialProps(ctx: any) {
      if (!isServer()) return {};
      const token = ServerCookie(ctx)["claims"];
      const initialProps = { token };
      if (!token) {
        ctx.res.writeHead(302, {
          Location: "/user",
        });
        ctx.res.end();
      }
      if (WrappedComponent.getInitialProps)
        return WrappedComponent.getInitialProps(initialProps);

      return initialProps;
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

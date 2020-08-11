import Router from "next/router";

import { isServer } from "@/utils";

export default function useRedirect({ res }) {
  if (isServer()) {
    res.writeHead(302, { Location: "/user" });
    res.end();
  } else {
    Router.push("user");
  }
}

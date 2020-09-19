import ServerCookie from "next-cookies";
import Cookies from "js-cookie";

import { isServer } from "@/lib/utils";

import { decodeJWT } from "./utils";

export default function getClaims(ctx) {
  let token;

  if (isServer()) token = ServerCookie(ctx)["claims"];
  else token = Cookies.get("claims");

  const claims = decodeJWT(token);

  if (!claims) return {};
  return { claims, token: `claims=${token}` };
}

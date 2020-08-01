import Cookies from "js-cookie";
import { useMemo } from "react";

import { decodeJWT } from "./utils";

export default function useClaims() {
  const token = Cookies.get("claims");
  const claims = useMemo(() => decodeJWT(token), [token]);

  return claims;
}

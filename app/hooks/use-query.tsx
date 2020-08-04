import { useEffect, useMemo, useLayoutEffect } from "react";
import { useRouter } from "next/router";

export default function useQuery({ param, action }): any {
  const { query } = useRouter();
  const observableParam = useMemo((): any => query[param], [query, param]);

  useEffect(() => action(observableParam), [observableParam]);

  return observableParam;
}

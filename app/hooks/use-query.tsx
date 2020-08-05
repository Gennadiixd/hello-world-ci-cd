import { useMemo } from "react";
import { useRouter } from "next/router";

export default function useQuery({ param }): any {
  const { query } = useRouter();
  const observableParam = useMemo((): any => query[param], [query, param]);

  return observableParam;
}

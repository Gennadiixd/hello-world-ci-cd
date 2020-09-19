import { useRouter } from "next/router";

export default function useObserveQueryParam(): any {
  const { query } = useRouter();

  const observeParam = (param): string => query[param] as string;

  const currentPageParam = parseInt(observeParam("page"), 10) || 1;

  return { observeParam, currentPageParam };
}

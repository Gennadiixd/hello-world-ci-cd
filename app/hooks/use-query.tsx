import { useRouter } from "next/router";

export default function useQuery() {
  const { push, query } = useRouter();

  const pushToQuery = (params) => {
    push({
      query: { ...query, ...params },
    });
  };

  const queryPage = (number) => {
    pushToQuery({ page: number });
  };

  const queryOrder = (orderBy, order) => {
    pushToQuery({ orderBy, order });
  };

  return { queryPage, queryOrder, query };
}

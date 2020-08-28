import { useRouter } from "next/router";

export default function useQuery() {
  const { push, query } = useRouter();

  const pushToQuery = (param, value) => {
    push({
      query: { ...query, [param]: value },
    });
  };

  const queryPage = (number) => {
    pushToQuery("page", number);
  };

  return { pushToQuery, queryPage };
}

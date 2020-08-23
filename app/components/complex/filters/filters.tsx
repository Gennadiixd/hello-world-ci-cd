import { useMemo } from "react";
import { useRouter } from "next/router";

import Button from "@/components/atomic/button";
import { ASCENDING, DESCENDING } from "@/constants";

export default function Filters({ searchCriterias }) {
  const { push, query } = useRouter();

  const handleFilter = (filterBy, orderBy = DESCENDING) => {
    push({
      query: { ...query, filterBy, orderBy },
    });
  };

  const filtersSection = useMemo(
    () =>
      searchCriterias.map((criteria) => (
        <div key={criteria} className="main__filters--action">
          Order by
          <Button
            className="main__filters--button"
            onClick={() => handleFilter(criteria)}
            isActive={criteria === query.filterBy}
          >
            {criteria}
          </Button>
          :
          <Button
            className="main__filters--button"
            onClick={() => handleFilter(criteria, ASCENDING)}
            isActive={
              ASCENDING === query.orderBy && criteria === query.filterBy
            }
          >
            &#8593;
          </Button>
          \
          <Button
            className="main__filters--button"
            onClick={() => handleFilter(criteria, DESCENDING)}
            isActive={
              DESCENDING === query.orderBy && criteria === query.filterBy
            }
          >
            &#8595;
          </Button>
        </div>
      )),
    [searchCriterias, query]
  );

  return <div className="main__filters--container">{filtersSection}</div>;
}

import { useMemo } from "react";
import { useRouter } from "next/router";

import Button from "@/components/atomic/button";
import { ASCENDING, DESCENDING } from "@/constants";

export default function Order({ orderCriterias }) {
  const { push, query } = useRouter();

  const handleOrder = (orderBy, order = DESCENDING) => {
    push({
      query: { ...query, orderBy, order },
    });
  };

  const ordersSection = useMemo(
    () =>
      orderCriterias.map((criteria) => (
        <div key={criteria} className="main__filters--action">
          Order by
          <Button
            className="main__filters--button"
            onClick={() => handleOrder(criteria)}
            isActive={criteria === query.orderBy}
          >
            {criteria}
          </Button>
          :
          <Button
            className="main__filters--button"
            onClick={() => handleOrder(criteria, ASCENDING)}
            isActive={
              ASCENDING === query.order && criteria === query.orderBy
            }
          >
            &#8593;
          </Button>
          \
          <Button
            className="main__filters--button"
            onClick={() => handleOrder(criteria, DESCENDING)}
            isActive={
              DESCENDING === query.order && criteria === query.orderBy
            }
          >
            &#8595;
          </Button>
        </div>
      )),
    [orderCriterias, query]
  );

  return <div className="main__filters--container">{ordersSection}</div>;
}

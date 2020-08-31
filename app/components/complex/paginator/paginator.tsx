import React, { useMemo } from "react";

import { getPageNumbers } from "@/utils";
import { PAGINATOR_BUTTONS_QUANTITY } from "@/constants";
import Button from "@/components/atomic/button";
import useQuery from "@/hooks/use-query";

export default function Paginator({ currentPageNumber = 1, totalPages }) {
  const { queryPage } = useQuery();

  const handlePageRequest = (number) => {
    if (number) queryPage(number);
  };

  const { pagesLeft, pagesRight } = useMemo(
    () =>
      getPageNumbers(currentPageNumber, totalPages, PAGINATOR_BUTTONS_QUANTITY),
    [currentPageNumber]
  );

  const numbersSection = [...pagesLeft, currentPageNumber, ...pagesRight].map(
    (number) => (
      <Button
        onClick={() => handlePageRequest(number)}
        isActive={number === currentPageNumber}
        key={number}
        className="main__pagination--button"
      >
        {number}
      </Button>
    )
  );

  return (
    <div className="main__pagination--container">
      <div className="main__pagination--actions">
        <Button
          onClick={() => handlePageRequest(1)}
          isDisabled={!pagesLeft[pagesLeft.length - 1]}
          className="main__pagination--button"
        >
          {`<<<`}
        </Button>
        <Button
          onClick={() => handlePageRequest(pagesLeft[pagesLeft.length - 1])}
          isDisabled={!pagesLeft[pagesLeft.length - 1]}
          className="main__pagination--button"
        >
          {`<`}
        </Button>
        {numbersSection}
        <Button
          onClick={() => handlePageRequest(pagesRight[0])}
          isDisabled={!pagesRight[0]}
          className="main__pagination--button"
        >
          {`>`}
        </Button>
      </div>
    </div>
  );
}

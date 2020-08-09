import React, { useMemo } from "react";
import { useRouter } from "next/router";

import { getPageNumbers } from "@/utils";
import { PAGINATOR_BUTTONS_QUANTITY } from "@/constants";
import Button from "@/components/atomic/button";

export default function Paginator({ currentPageNumber = 1, totalPages }) {
  const { push, query } = useRouter();

  const handlePageRequest = (number) => {
    if (number) {
      push({
        query: { ...query, page: number },
      });
    }
  };

  const { pagesLeft, pagesRight } = useMemo(
    () =>
      getPageNumbers(currentPageNumber, totalPages, PAGINATOR_BUTTONS_QUANTITY),
    [currentPageNumber]
  );

  const numbersSection = useMemo(
    () =>
      [...pagesLeft, currentPageNumber, ...pagesRight].map((number) => (
        <Button
          onClick={() => handlePageRequest(number)}
          isActive={number === currentPageNumber}
          key={number}
          className="main__pagination--button"
        >
          {number}
        </Button>
      )),
    [pagesLeft, currentPageNumber, pagesRight, query]
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

import React, { useMemo } from "react";
import { useRouter } from "next/router";

import { getPageNumbers } from "@/utils";
import { PAGINATOR_BUTTONS_QUANTITY } from "@/constants";

const PaginatorButton = ({
  children,
  onClick,
  isActive = false,
  isDisabled = false,
}) => (
  <button
    onClick={onClick}
    className={`main__pagination--button${isActive ? "--active" : ""}`}
    disabled={isActive || isDisabled}
  >
    {children}
  </button>
);

export default function Paginator({ currentPageNumber = 1, totalPages }) {
  const { push } = useRouter();

  const handlePageRequest = (number) => {
    if (number) {
      push({
        query: { page: number },
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
        <PaginatorButton
          onClick={() => handlePageRequest(number)}
          isActive={number === currentPageNumber}
          key={number}
        >
          {number}
        </PaginatorButton>
      )),
    [pagesLeft, currentPageNumber, pagesRight]
  );

  return (
    <div className="main__pagination--container">
      <div className="main__pagination--actions">
        <PaginatorButton
          onClick={() => handlePageRequest(1)}
          isDisabled={!pagesLeft[pagesLeft.length - 1]}
        >
          {`<<<`}
        </PaginatorButton>
        <PaginatorButton
          onClick={() => handlePageRequest(pagesLeft[pagesLeft.length - 1])}
          isDisabled={!pagesLeft[pagesLeft.length - 1]}
        >
          {`<`}
        </PaginatorButton>
        {numbersSection}
        <PaginatorButton
          onClick={() => handlePageRequest(pagesRight[0])}
          isDisabled={!pagesRight[0]}
        >
          {`>`}
        </PaginatorButton>
      </div>
    </div>
  );
}

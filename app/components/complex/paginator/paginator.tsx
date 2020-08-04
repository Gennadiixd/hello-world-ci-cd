import React, { useMemo } from "react";
import { useRouter } from "next/router";

import { getPageNumbers } from "@/utils/index";

export default function Paginator({ currentPageNumber = 1 }) {
  const { push } = useRouter();

  const handlePageRequest = (number) => {
    push({
      query: { page: number },
    });
  };

  const pageNumbers = useMemo(() => getPageNumbers(currentPageNumber, 5), [
    currentPageNumber,
  ]);

  const numbersSection = useMemo(
    () =>
      pageNumbers.map((number) => (
        <button
          onClick={() => handlePageRequest(number)}
          key={number}
          className={`main__pagination--button${
            number === currentPageNumber ? "--active" : ""
          }`}
        >
          {number}
        </button>
      )),
    [pageNumbers]
  );

  return (
    <div className="main__pagination--container">
      <div className="main__pagination--actions">{numbersSection}</div>
    </div>
  );
}

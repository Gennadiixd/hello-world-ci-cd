import React from "react";
import { useMemo } from "react";

export default function CardsGrid({ children }) {
  const cardSection = useMemo(
    () =>
      React.Children.map(children, (child) => (
        <div className="grid-3 card--container" key={child.id}>
          {child}
        </div>
      )),
    [children]
  );

  return <div className="grid-12 cards__grid">{cardSection}</div>;
}

import { useState, useEffect } from "react";
import { isServer } from "../utils";

export default function useMedia(values, defaultValue) {
  if (isServer()) return defaultValue;
  const queries = [
    "(max-width: 768px)",
    "(min-width: 768px) and (max-width: 990px)",
  ];
  const mediaQueryLists = queries.map((q) => window.matchMedia(q));

  const getValue = () => {
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    return typeof values[index] !== "undefined" ? values[index] : defaultValue;
  };

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const handler = () => setValue(getValue);
    mediaQueryLists.forEach((mql) => mql.addListener(handler));
    return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler));
  }, []);

  return value;
}

import { useState, useEffect } from "react";

export default function useCache(items) {
  const [cachedItems, setCachedItems] = useState(items);

  useEffect(() => {
    setCachedItems(items);
  }, [items]);

  return [cachedItems, setCachedItems];
}

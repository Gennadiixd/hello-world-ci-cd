import { useState, useEffect } from "react";

export default function useCache(items) {
  const [cachedItems, setCachedSearchItems] = useState(items);

  useEffect(() => {
    setCachedSearchItems(items);
  }, [items]);

  return [cachedItems, setCachedSearchItems];
}

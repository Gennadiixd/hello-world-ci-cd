import { useEffect } from "react";

import useDebounce from "@/lib/hooks/use-debounce";
import useCache from "@/lib/hooks/use-cache";
import usePrevious from "@/lib/hooks/use-previous";
import { SEARCH_LENGTH_THRESHOLD } from "@/lib/constants";

export default function useSearch({ searchItems, searchValue, onSearch }) {
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [cachedSearchItems, setCachedSearchItems] = useCache(searchItems);
  const previousSearchValue = usePrevious(debouncedSearchValue);

  const handleSearchByTitle = () => {
    onSearch({ title: debouncedSearchValue });
  };

  const handleFilterSearchItems = () => {
    setCachedSearchItems(
      searchItems.filter((item) => item.title.includes(debouncedSearchValue))
    );
  };

  const handleClearSearch = () => {
    onSearch();
  };

  useEffect(() => {
    const prevSearchLength = (previousSearchValue || []).length;
    const currentSearchLength = debouncedSearchValue?.length;

    if (currentSearchLength <= SEARCH_LENGTH_THRESHOLD) {
      handleClearSearch();
      return;
    }

    if (!cachedSearchItems?.length || currentSearchLength < prevSearchLength) {
      handleSearchByTitle();
    } else {
      handleFilterSearchItems();
    }
  }, [debouncedSearchValue]);

  return [debouncedSearchValue, cachedSearchItems];
}

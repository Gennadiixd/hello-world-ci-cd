import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import TextInput from "@/lib/components/atomic/text-input/text-input";
import useSearch from "@/lib/hooks/use-search";

export default function SearchBar({ onSearch, searchItems, onSelectSuggest }) {
  const { register, watch, setValue } = useForm();
  const watchSearchInputValue = watch("search-bar");
  const [isSearchInFocus, setSearchInFocus] = useState(false);
  const [debouncedSearchValue, cachedSearchItems] = useSearch({
    onSearch,
    searchItems,
    searchValue: watchSearchInputValue,
  });

  const suggestsSection = useMemo(
    () =>
      debouncedSearchValue?.length > 1 ? (
        <ul
          className={`search__bar--suggests ${isSearchInFocus ? "" : "hidden"}`}
          onClick={onSelectSuggest}
        >
          {cachedSearchItems.length ? (
            cachedSearchItems.map(({ id, title }) => (
              <li className="search__bar--suggest" key={id} data-id={id}>
                {title}
              </li>
            ))
          ) : (
            <li className="search__bar--suggest">No matches found.</li>
          )}
        </ul>
      ) : null,
    [debouncedSearchValue, cachedSearchItems, isSearchInFocus]
  );

  const handleSuggestsOpen = (event) => {
    setSearchInFocus(true);
  };

  const handleSuggestsClose = () => {
    setSearchInFocus(false);
    setValue("search-bar", "");
  };

  return (
    <div className="search__bar--container">
      <div className="search__bar--search" onFocus={handleSuggestsOpen}>
        <TextInput
          name="search-bar"
          id="search-bar"
          fieldRef={register}
          placeholder="search by name"
        />
        <FontAwesomeIcon icon={faSearch} className="search__bar--icon" />
      </div>
      {suggestsSection}
      <div
        className={`search__bar--layout ${isSearchInFocus ? "" : "hidden"}`}
        onClick={handleSuggestsClose}
      />
    </div>
  );
}

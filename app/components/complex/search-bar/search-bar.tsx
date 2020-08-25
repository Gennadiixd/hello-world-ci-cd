import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import TextInput from "@/components/atomic/text-input/text-input";
import useDebounce from "@/hooks/use-debounce";

export default function SearchBar({ onSearch, searchItems, onSelectSuggest }) {
  const { register, watch, setValue } = useForm();
  const watchSearchInputValue = watch("search-bar");
  const debouncedSearchValue = useDebounce(watchSearchInputValue, 500);
  const [isSearchInFocus, setSearchInFocus] = useState(false);

  useEffect(() => {
    if (debouncedSearchValue?.length > 1) {
      onSearch({ title: debouncedSearchValue });
    } else {
      if (searchItems?.length) onSearch();
    }
  }, [debouncedSearchValue]);

  const suggestsSection = useMemo(
    () =>
      debouncedSearchValue?.length ? (
        <ul
          className={`search__bar--suggests ${isSearchInFocus ? "" : "hidden"}`}
          onClick={onSelectSuggest}
        >
          {searchItems.length ? (
            searchItems.map(({ id, title }) => (
              <li className="search__bar--suggest" key={id} data-id={id}>
                {title}
              </li>
            ))
          ) : (
            <li className="search__bar--suggest">No matches found.</li>
          )}
        </ul>
      ) : null,
    [searchItems, debouncedSearchValue]
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

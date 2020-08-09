import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import TextInput from "@/components/atomic/text-input/text-input";
import useDebounce from "@/hooks/use-debounce";
import {
  fetchProductsByAC,
  getProductsSearchStateSelector,
} from "@/views/products/ducks";

export default function SearchBar({}) {
  const { register, watch } = useForm();
  const dispatch = useDispatch();
  const watchSearchInputValue = watch("search-bar");
  const debouncedSearchValue = useDebounce(watchSearchInputValue, 500);
  const productsSearchState = useSelector(getProductsSearchStateSelector);
  const [isSearchInFocus, setSearchInFocus] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    if (debouncedSearchValue?.length > 1) {
      dispatch(fetchProductsByAC({ title: debouncedSearchValue }));
    } else {
      if (productsSearchState?.length) dispatch(fetchProductsByAC(null));
    }
  }, [debouncedSearchValue]);

  const suggestsSection = useMemo(
    () =>
      productsSearchState.length ? (
        productsSearchState.map(({ id, title }) => (
          <li className="search__bar--suggest" key={id} data-id={id}>
            {title}
          </li>
        ))
      ) : (
        <li className="search__bar--suggest">No matches found.</li>
      ),
    [productsSearchState]
  );

  const handleClickSuggest = (event) => {
    const { id } = event.target.dataset;
    if (id) push(`/product/[id]`, `/product/${id}`);
  };

  const handleSuggestsOpen = (event) => {
    setSearchInFocus(true);
  };

  const handleSuggestsClose = () => {
    setSearchInFocus(false);
  };

  return (
    <div className="grid-4 search__bar--container">
      <div className="search__bar--search" onFocus={handleSuggestsOpen}>
        <TextInput
          name="search-bar"
          id="search-bar"
          fieldRef={register}
          placeholder="search product by name"
        />
        <FontAwesomeIcon icon={faSearch} className="search__bar--icon" />
      </div>
      <ul
        className={`search__bar--suggests ${isSearchInFocus ? "" : "hidden"}`}
        onClick={handleClickSuggest}
      >
        {suggestsSection}
      </ul>
      <div
        className={`search__bar--layout ${isSearchInFocus ? "" : "hidden"}`}
        onClick={handleSuggestsClose}
      />
    </div>
  );
}

import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { chunk } from "@/utils";
import { GRID_CARDS_IN_ROW, PRODUCTS_PER_PAGE } from "@/constants";
import SearchBar from "@/components/complex/search-bar";
import Filters from "@/components/complex/filters";
import MainLayout from "@/components/complex/main-layout";
import Paginator from "@/components/complex/paginator";
import { initializeStore } from "@/ducks/index";
import useQuery from "@/hooks/use-query";
import useMedia from "@/hooks/use-media";
import {
  fetchProductsByAC,
  getProductsSearchStateSelector,
} from "@/views/products/ducks";

import ProductCard from "./components/product-card";
import { fetchProductsAC } from "./ducks";
import {
  getProductsPageSelector,
  getProductsPaginationSelector,
} from "./ducks/selectors";

const searchCriterias = ["price", "rate"];

export default function ProductsPage() {
  const pageNumberParam = useQuery({ param: "page" });
  const { totalPages } = useSelector(getProductsPaginationSelector);
  const columnCount = useMedia([1, 2], GRID_CARDS_IN_ROW);
  const productsSearchState = useSelector(getProductsSearchStateSelector);
  const dispatch = useDispatch();
  const { push } = useRouter();

  const chunkedProducts = chunk(
    useSelector((state) =>
      getProductsPageSelector(pageNumberParam || 1, state)
    ),
    columnCount
  );

  const productCardsSection = useMemo(
    () =>
      chunkedProducts.map((chunk, index) => (
        <div className="grid-12 cards__grid--cards-row" key={index}>
          {chunk.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )),
    [chunkedProducts]
  );

  const currentPageNumber = useMemo(() => parseInt(pageNumberParam) || 1, [
    pageNumberParam,
  ]);

  const handleProductSearch = (searchCriteria) => {
    dispatch(fetchProductsByAC(searchCriteria));
  };

  const handleSelectSuggest = (event) => {
    const { id } = event.target.dataset;
    if (id) push(`/product/[id]`, `/product/${id}`);
  };

  return (
    <MainLayout title="Products Page">
      <div className="grid-12 cards__grid">
        <div className="grid-12 cards__grid--actions">
          <SearchBar
            searchItems={productsSearchState}
            onSearch={handleProductSearch}
            onSelectSuggest={handleSelectSuggest}
          />
          <Filters searchCriterias={searchCriterias} />
          <Paginator
            currentPageNumber={currentPageNumber}
            totalPages={totalPages}
          />
        </div>
        {productCardsSection}
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps({ query }) {
  const { page, filterBy, orderBy } = query;
  const reduxStore = initializeStore({});
  const { dispatch } = reduxStore;

  await dispatch(
    fetchProductsAC({
      page: page || 1,
      perPage: PRODUCTS_PER_PAGE,
      filterBy,
      orderBy,
    })
  );

  const { products } = reduxStore.getState();

  return {
    props: { initialReduxState: { products } },
  };
}

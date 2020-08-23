import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { PRODUCTS_PER_PAGE } from "@/constants";
import SearchBar from "@/components/complex/search-bar";
import Filters from "@/components/complex/filters";
import MainLayout from "@/components/complex/main-layout";
import Paginator from "@/components/complex/paginator";
import { initializeStore } from "@/ducks/index";
import useQuery from "@/hooks/use-query";
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

const orderCriterias = ["price", "rate"];

export default function ProductsPage() {
  const pageNumberParam = useQuery({ param: "page" });
  const { totalPages } = useSelector(getProductsPaginationSelector);
  const productsSearchState = useSelector(getProductsSearchStateSelector);
  const dispatch = useDispatch();
  const { push } = useRouter();

  const products = useSelector((state) =>
    getProductsPageSelector(pageNumberParam || 1, state)
  );

  const productCardsSection = useMemo(
    () => (
      <div className="grid-12 cards__grid--cards">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    ),
    [products]
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
        <div className="cards__grid--actions">
          <Filters orderCriterias={orderCriterias} />
          <SearchBar
            searchItems={productsSearchState}
            onSearch={handleProductSearch}
            onSelectSuggest={handleSelectSuggest}
          />
        </div>
        <Paginator
          currentPageNumber={currentPageNumber}
          totalPages={totalPages}
        />
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

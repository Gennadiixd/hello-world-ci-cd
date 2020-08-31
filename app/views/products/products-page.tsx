import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { PRODUCTS_PER_PAGE } from "@/constants";
import SearchBar from "@/components/complex/search-bar";
import Order from "@/components/complex/order";
import MainLayout from "@/components/complex/main-layout";
import Paginator from "@/components/complex/paginator";
import { initializeStore } from "@/ducks/index";
import useObserveQueryParam from "@/hooks/use-observe-query-param";
import {
  fetchProductsByAC,
  getProductsSearchStateSelector,
} from "@/views/products/ducks";
import useRedirect from "@/hooks/use-redirect";
import { ORDERS } from "@/constants";

import ProductCard from "./components/product-card";
import { fetchProductsAC } from "./ducks";
import {
  getProductsPageSelector,
  getProductsPaginationSelector,
} from "./ducks/selectors";

const orderCriterias = [ORDERS.PRICE, ORDERS.RATE];

export default function ProductsPage() {
  const { currentPageParam } = useObserveQueryParam();
  const { totalPages } = useSelector(getProductsPaginationSelector);
  const productsSearchState = useSelector(getProductsSearchStateSelector);
  const dispatch = useDispatch();
  const { redirectToProductPage } = useRedirect();

  const products = useSelector((state) =>
    getProductsPageSelector(currentPageParam, state)
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

  const handleProductSearch = (searchCriteria) => {
    dispatch(fetchProductsByAC(searchCriteria));
  };

  const handleSelectSuggest = (event) => {
    const { id } = event.target.dataset;
    if (id) redirectToProductPage(id);
  };

  return (
    <MainLayout title="Products Page">
      <div className="grid-12 cards__grid">
        <div className="cards__grid--actions">
          <Order orderCriterias={orderCriterias} />
          <SearchBar
            searchItems={productsSearchState}
            onSearch={handleProductSearch}
            onSelectSuggest={handleSelectSuggest}
          />
        </div>
        <Paginator
          currentPageNumber={currentPageParam}
          totalPages={totalPages}
        />
        {productCardsSection}
        <Paginator
          currentPageNumber={currentPageParam}
          totalPages={totalPages}
        />
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps({ query }) {
  const { page, order, orderBy } = query;
  const reduxStore = initializeStore({});
  const { dispatch } = reduxStore;

  await dispatch(
    fetchProductsAC({
      page: page || 1,
      perPage: PRODUCTS_PER_PAGE,
      order,
      orderBy,
    })
  );

  const { products } = reduxStore.getState();

  return {
    props: { initialReduxState: { products } },
  };
}

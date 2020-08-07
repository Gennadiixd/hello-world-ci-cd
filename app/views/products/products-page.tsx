import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { initializeStore } from "@/ducks/index";
import MainLayout from "@/components/complex/main-layout";
import { chunk } from "@/utils";
import useQuery from "@/hooks/use-query";
import Paginator from "@/components/complex/paginator";
import { GRID_CARDS_IN_ROW, PRODUCTS_PER_PAGE } from "@/constants";

import ProductCard from "./components/product-card";
import { fetchProductsAC } from "./ducks";
import {
  getProductsPageSelector,
  getProductsPaginationSelector,
} from "./ducks/selectors";
import useMedia from "../../hooks/use-media";

export default function ProductsPage() {
  const pageNumberParam = useQuery({ param: "page" });
  const { totalPages } = useSelector(getProductsPaginationSelector);
  const columnCount = useMedia([1, 2], 3);

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

  return (
    <MainLayout title="Products Page">
      <div className="grid-12 cards__grid">
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
  const { page } = query;
  const reduxStore = initializeStore({});
  const { dispatch } = reduxStore;

  await dispatch(fetchProductsAC(page || 1, PRODUCTS_PER_PAGE));

  const { products } = reduxStore.getState();

  return {
    props: { initialReduxState: { products } },
  };
}

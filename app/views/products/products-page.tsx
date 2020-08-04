import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { initializeStore } from "@/ducks/index";
import MainLayout from "@/components/complex/main-layout";
import { chunk } from "@/utils/index";
import useQuery from "@/hooks/use-query";
import Paginator from "@/components/complex/paginator";

import ProductCard from "./components/product-card";
import { fetchProductsAC } from "./ducks";
import { getProductsSelector } from "./ducks/selectors";

export default function ProductsPage({}) {
  const pageNumberParam = useQuery({ param: "page", action: console.log });
  const chunkedProducts = chunk(useSelector(getProductsSelector), 4);

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
        <Paginator currentPageNumber={currentPageNumber} />
        {productCardsSection}
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps(ctx) {
  const reduxStore = initializeStore({});
  const { dispatch } = reduxStore;

  await dispatch(fetchProductsAC());

  const { products } = reduxStore.getState();

  return {
    props: { initialReduxState: { products } },
  };
}

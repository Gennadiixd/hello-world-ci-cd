import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { initializeStore } from "@/ducks/index";
import MainLayout from "@/components/complex/main-layout";
import { chunk } from "@/utils/index";

import ProductCard from "./components/product-card";
import { fetchProductsAC } from "./ducks";
import { getProductsSelector } from "./ducks/selectors";

export default function ProductsPage({}) {
  const chunkedProducts = chunk(useSelector(getProductsSelector), 4);

  const productCardsSection = useMemo(
    () =>
      chunkedProducts.map((chunk, index) => (
        <div className="grid-12 cards__grid--cards-row">
          {chunk.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )),
    [chunkedProducts]
  );

  return (
    <MainLayout title="Products Page">
      <div className="grid-12 cards__grid">{productCardsSection}</div>;
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

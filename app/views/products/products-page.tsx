import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { initializeStore } from "@/ducks/index";
import MainLayout from "@/components/complex/main-layout";
import CardGrid from "@/components/complex/card-grid";

import ProductCard from "./components/product-card";
import { fetchProductsAC } from "./ducks";
import { getProductsSelector } from "./ducks/selectors";

export default function ProductsPage({}) {
  const products = useSelector(getProductsSelector);

  const productCardsSection = useMemo(
    () =>
      products.map((product) => (
        <ProductCard product={product} key={product.id} />
      )),
    [products]
  );

  return (
    <MainLayout title="Products Page">
      <CardGrid>{productCardsSection}</CardGrid>
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

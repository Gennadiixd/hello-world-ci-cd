import { useObserver } from "mobx-react";

import MainLayout from "../../components/complex/main-layout.js/main-layout";
import CardGrid from "../../components/complex/card-grid";
import ProductCard from "./components/product-card";
import React, { useMemo, useContext } from "react";
import useMount from "../../hooks/useMount";
import { MobXProviderContext } from "mobx-react";

export default function ProductsPage() {
  const {
    productsStore: { getProducts, fetchProducts },
  } = useContext(MobXProviderContext);

  const www = useMemo(() => fetchProducts(), []);
  const products = useMemo(() => getProducts(), []);

  console.log(www);
  console.log(products);
  

  // const { productsStore } = useStore();

  // const getProducts = () => {
  //   productsStore.getProducts();
  // };

  // useMount(() => {
  //   getProducts();
  // });

  // const productCardsSection = useObserver(() =>
  //   productsStore.products.map((product) => <ProductCard product={product} />)
  // );

  return (
    <MainLayout title="Products Page">
      {/* <CardGrid>{productCardsSection}</CardGrid> */}
    </MainLayout>
  );
}

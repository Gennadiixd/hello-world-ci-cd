import { useObserver } from "mobx-react";

import MainLayout from "../../components/complex/main-layout";
import CardGrid from "../../components/complex/card-grid";
import ProductCard from "./components/product-card";
import React, { useMemo, useContext } from "react";
import useMount from "../../hooks/useMount";
import { MobXProviderContext } from "mobx-react";
import { initializeStore } from "../../ducks";
import { initialState } from "./ducks/reducer";
import { serverGetProductsAC } from "./ducks";
import { setProductsAC } from "./ducks/action-creators";

export default function ProductsPage(props) {
  // const {
  //   productsStore: { getProducts, fetchProducts },
  // } = useContext(MobXProviderContext);

  // const www = useMemo(() => fetchProducts(), []);
  // const products = useMemo(() => getProducts(), []);

  console.log(props);
  // console.log(products);

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
      {/* <ProductsContainer /> */}
      {/* <CardGrid>{productCardsSection}</CardGrid> */}
    </MainLayout>
  );
}

export async function getStaticProps(ctx) {
  const reduxStore = initializeStore({});
  const { dispatch } = reduxStore;

  await dispatch(serverGetProductsAC());

  return { props: { initialReduxState: reduxStore.getState() } };
}

import { useMemo, useState } from "react";
import { useObserver, useLocalStore } from "mobx-react";

import MainLayout from "../../components/complex/main-layout.js/main-layout";
import CardGrid from "../../components/complex/card-grid";
import ProductCard from "./components/product-card";
import { useStore } from "../../stores/stores";

export default function ProductsPage() {
  const { productsStore } = useStore();

  // const [products, setProducts] = useState([]);

  // const products = useLocalStore(() => ({ name: 'John' }))

  const getProducts = () => {
    productsStore.getProducts();
  };

  const { products } = productsStore;

  const productsSection = useMemo(
    () => products.map((product) => <ProductCard product={product} />),
    [products]
  );

  return useObserver(() => (
    <MainLayout>
      <button onClick={getProducts}></button>
      <CardGrid>{productsSection}</CardGrid>
    </MainLayout>
  ));
}

import MainLayout from "@/components/complex/main-layout";
import { initializeStore } from "@/ducks/index";
import { fetchProductsAC } from "@/views/products/ducks";

import CreateProduct from "./create-product";
import UpdateProduct from "./update-product";

export default function ManageProducts() {
  return (
    <MainLayout title="Manage products">
      <div className="grid-12 manage__products--container">
        <CreateProduct />
        <UpdateProduct />
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const reduxStore = initializeStore({});
  const { dispatch } = reduxStore;

  // await dispatch(fetchProductsAC());

  const { products } = reduxStore.getState();

  return {
    props: { initialReduxState: { products } },
  };
}

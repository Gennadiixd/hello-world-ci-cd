import MainLayout from "@/components/complex/main-layout";

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

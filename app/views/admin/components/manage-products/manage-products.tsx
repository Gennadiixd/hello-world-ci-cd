import { useForm } from "react-hook-form";
import MainLayout from "@/components/complex/main-layout";
import TextInput from "@/components/atomic/text-input";
import ImageInput from "@/components/atomic/image-input";
import ProductsService from "@/services/products-service";

import useImage from "./hooks/useImage";

const productsService = new ProductsService({});

export default function ManageProducts() {
  const { register, handleSubmit, watch } = useForm();
  const watchImage = watch("image");
  const image = useImage(watchImage);

  const onSubmit = (productData, e) => {
    productsService.createProduct(new FormData(e.target));
  };

  return (
    <MainLayout title="Manage products">
      <div className="grid-12 manage__products--container">
        <div className="grid-8 create__product__form--container">
          <h3>Create Product Form</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="create__product__form"
          >
            <div className="grid-12 create__product__form--body">
              <div className="grid-8 create__product__form--inputs">
                <TextInput
                  name="title"
                  label="Product title"
                  id="title"
                  fieldRef={register}
                />
                <TextInput
                  name="description"
                  label="Product description"
                  id="description"
                  fieldRef={register}
                  textArea
                />
                <TextInput
                  name="price"
                  label="Product price"
                  id="price"
                  fieldRef={register}
                />
                <ImageInput
                  name="image"
                  label="Product image"
                  id="image"
                  fieldRef={register}
                />
              </div>
              <img
                src={image}
                className="grid-4 create__product__form--image"
              />
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

import { useForm } from "react-hook-form";
import MainLayout from "@/components/complex/main-layout";
import TextInput from "@/components/atomic/text-input";
import ImageInput from "@/components/atomic/image-input";
import ProductsService from "@/services/products-service";

import useImage from "./hooks/useImage";

const productsService = new ProductsService({});

export default function CreateProduct() {
  const { register, handleSubmit, watch } = useForm();
  const watchImage = watch("image");
  const image = useImage(watchImage);

  const onSubmit = (productData, e) => {
    productsService.createProduct(new FormData(e.target));
  };

  return (
    <MainLayout title="Create product">
      <div className="grid-8 create__product__form--container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid-8 create__product__form"
        >
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
          <button type="submit">Create</button>
        </form>
        <img src={image} className="grid-4" />
      </div>
    </MainLayout>
  );
}
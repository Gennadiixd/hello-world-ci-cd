import { useForm } from "react-hook-form";
import TextInput from "@/lib/components/atomic/text-input";
import ImageInput from "@/lib/components/atomic/image-input";
import NumericInput from "@/lib/components/atomic/numeric-input";
import ProductsService from "@/lib/services/products-service";

import useImage from "./hooks/useImage";

const productsService = new ProductsService({});

export default function CreateProduct() {
  const { register, handleSubmit, watch } = useForm();
  const watchImage = watch("image");
  const image = useImage(watchImage);

  const onSubmit = (_, event) => {
    productsService.createProduct(new FormData(event.target));
  };

  return (
    <div className="grid-8 create__product__form--container">
      <h3>Create Product Form</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="create__product__form">
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
            <NumericInput
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
          <img src={image} className="grid-4 create__product__form--image" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

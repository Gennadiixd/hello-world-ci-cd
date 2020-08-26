import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import MainLayout from "@/components/complex/main-layout";
import TextInput from "@/components/atomic/text-input";
import ProductsService from "@/services/products-service";
import { getCartStateSelector } from "@/views/cart/ducks/selectors";

const productsService = new ProductsService({});

export default function Checkout() {
  const { register, handleSubmit } = useForm();
  const cartState = useSelector(getCartStateSelector);

  const onSubmit = (checkoutFormData) => {
    productsService.checkout({ ...checkoutFormData, ...cartState });
  };

  return (
    <MainLayout title="Cart Page">
      <div className="grid-12 checkout">
        <form onSubmit={handleSubmit(onSubmit)} className="checkout__form">
          <TextInput
            name="name"
            label="Enter your full name"
            id="name"
            fieldRef={register}
          />
          <TextInput
            name="address"
            label="Enter your full address"
            id="address"
            fieldRef={register}
          />
          <TextInput
            name="comment"
            label="Enter any comment to your order"
            id="comment"
            fieldRef={register}
            textArea
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </MainLayout>
  );
}

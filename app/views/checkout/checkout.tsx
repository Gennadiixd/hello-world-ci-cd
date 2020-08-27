import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import MainLayout from "@/components/complex/main-layout";
import TextInput from "@/components/atomic/text-input";
import { getCartStateSelector } from "@/views/cart/ducks/selectors";
import { checkoutAC } from "@/views/products/ducks";
import Modal from "@/components/complex/modal";
import useBoolean from "@/hooks/use-boolean";

export default function Checkout() {
  const { register, handleSubmit, watch } = useForm();
  const watchNameValue = watch("name");
  const dispatch = useDispatch();
  const { push } = useRouter();
  const [isModalOpen, setModalOpen, setModalClose] = useBoolean();

  const cartData = useSelector(getCartStateSelector);
  const { items, totalPrice } = cartData;

  const handleCloseModal = () => {
    setModalClose();
    push("/products");
  };

  const onSubmit = ({ name, address, comment }) => {
    dispatch(checkoutAC({ name, address, comment, cartData }, setModalOpen));
  };

  const cartItemsPreviewSection = Object.values(items).map(
    ({ title, image, id, count }) => (
      <div className="grid-6 grid-sm-10 grid-xs-12 checkout--item" key={id}>
        <div className="checkout--image-container">
          <img src={image} />
        </div>
        <div className="checkout--info">
          <div className="checkout--title">{title}</div>
          <div className="checkout--count">(x {count})</div>
        </div>
      </div>
    )
  );

  return (
    <MainLayout title="Cart Page">
      <div className="grid-12 checkout--container">
        <div className="checkout--info">
          <div className="cart__total--price">Total price {totalPrice} $</div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="checkout__form">
          <TextInput
            name="name"
            label="Enter your full name"
            id="name"
            fieldRef={register}
            placeholder="Petr Petrov"
          />
          <TextInput
            name="address"
            label="Enter your full address"
            id="address"
            fieldRef={register}
            placeholder="city Moscow, str Pushkina, apt Kolotushkina 94-95"
          />
          <TextInput
            name="comment"
            label="Enter any comment to your order"
            id="comment"
            fieldRef={register}
            textArea
            placeholder="Call me 1 hour before, tel +9 123-456-78-90"
          />
          <button type="submit">Checkout</button>
        </form>
        <div className="checkout--preview">{cartItemsPreviewSection}</div>
      </div>
      <Modal
        message={`Dear ${watchNameValue} Thank you for order, we will contact you soon`}
        isModalOpen={isModalOpen}
        onCloseModal={handleCloseModal}
      />
    </MainLayout>
  );
}

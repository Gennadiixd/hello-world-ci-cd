import { useSelector, useDispatch } from "react-redux";

import MainLayout from "@/components/complex/main-layout";
import Link from "@/components/atomic/link";

import { getCartItemsSelector } from "./ducks/selectors";
import CartItem from "./components/cart-item/index";
import { addToCartAC, removeFromCartAC } from "./ducks/action-creators";

export default function CartPage() {
  const cartItems = useSelector(getCartItemsSelector);
  const dispatch = useDispatch();

  const handleIncreaseItemsCounter = (id) => {
    dispatch(addToCartAC({ id }));
  };

  const handleDecreaseItemsCounter = (id) => {
    dispatch(removeFromCartAC({ id }));
  };

  const CartItemsSection = cartItems.map((cartElement) => {
    return (
      <CartItem
        item={cartElement}
        onIncreaseItemsCounter={handleIncreaseItemsCounter}
        onDecreaseItemsCounter={handleDecreaseItemsCounter}
      />
    );
  });

  return (
    <MainLayout title="Cart Page">
      <div className="grid-12 cart__page">
        {CartItemsSection}
        <button>
          <Link href="checkout">Checkout</Link>
        </button>
      </div>
    </MainLayout>
  );
}

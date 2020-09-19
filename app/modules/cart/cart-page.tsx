import { useSelector, useDispatch } from "react-redux";

import MainLayout from "@/lib/components/complex/main-layout";
import Link from "@/lib/components/atomic/link";

import { getCartItemsSelector, getCartStateSelector } from "./ducks/selectors";
import CartItem from "./components/cart-item/index";
import { addToCartAC, removeFromCartAC } from "./ducks/action-creators";

export default function CartPage() {
  const cartItems = useSelector(getCartItemsSelector);
  const { totalPrice } = useSelector(getCartStateSelector);
  const dispatch = useDispatch();

  const handleIncreaseItemsCounter = (product) => {
    dispatch(addToCartAC(product));
  };

  const handleDecreaseItemsCounter = (product) => {
    dispatch(removeFromCartAC(product));
  };

  const cartItemsSection = cartItems.map((cartElement: any) => {
    return (
      <CartItem
        key={cartElement.id}
        item={cartElement}
        onIncreaseItemsCounter={handleIncreaseItemsCounter}
        onDecreaseItemsCounter={handleDecreaseItemsCounter}
      />
    );
  });

  const checkoutLinkSection = (predicate, alternativeSection = null) =>
    predicate ? (
      <Link href="checkout" className="cart__page--checkout--link">
        Checkout
      </Link>
    ) : (
      alternativeSection
    );

  return (
    <MainLayout title="Cart Page">
      <div className="grid-12 cart__page">
        <div className="cart__page--info">
          Total price {totalPrice} $
          <div>{checkoutLinkSection(totalPrice, "Your cart is empty")}</div>
        </div>
        {cartItemsSection}
        {checkoutLinkSection(totalPrice)}
      </div>
    </MainLayout>
  );
}

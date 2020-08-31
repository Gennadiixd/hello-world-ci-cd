import { useSelector, useDispatch } from "react-redux";

import useReduxLocalStorage from "@/hooks/use-redux-local-storage";
import { getCartStateSelector } from "@/views/cart/ducks/selectors";
import { setCartStateAC } from "@/views/cart/ducks/action-creators";

export default function RestoreLocalStorageState() {
  const cartState = useSelector(getCartStateSelector);
  const dispatch = useDispatch();

  const setCartState = (state) => {
    dispatch(setCartStateAC(state));
  };

  useReduxLocalStorage("cart", cartState, setCartState);

  return null;
}

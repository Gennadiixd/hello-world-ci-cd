import { useSelector, useDispatch } from "react-redux";

import useReduxLocalStorage from "@/lib/hooks/use-redux-local-storage";
import { getCartStateSelector } from "@/modules/cart/ducks/selectors";
import { setCartStateAC } from "@/modules/cart/ducks/action-creators";

export default function RestoreLocalStorageState() {
  const cartState = useSelector(getCartStateSelector);
  const dispatch = useDispatch();

  const setCartState = (state) => {
    dispatch(setCartStateAC(state));
  };

  useReduxLocalStorage("cart", cartState, setCartState);

  return null;
}

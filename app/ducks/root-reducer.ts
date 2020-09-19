import { combineReducers } from "redux";
import productsReducer from "../modules/products/ducks";
import userReducer from "../modules/user/ducks";
import cartReducer from "../modules/cart/ducks";

export default combineReducers({
  products: productsReducer,
  user: userReducer,
  cart: cartReducer,
});

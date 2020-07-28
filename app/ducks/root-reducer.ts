import { combineReducers } from "redux";
import productsReducer from "../views/products/ducks";
import userReducer from "../views/user/ducks";

export default combineReducers({
  products: productsReducer,
  user: userReducer,
});

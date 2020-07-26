import { combineReducers } from "redux";
import productsReducer from "../pages/products/ducks";
import userReducer from "../pages/user/ducks";

export default combineReducers({
  products: productsReducer,
  user: userReducer,
});

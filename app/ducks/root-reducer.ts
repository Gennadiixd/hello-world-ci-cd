import { combineReducers } from "redux";
import { reducer } from "./reducer";
import productsReducer from "../pages/products/ducks/index";

export default combineReducers({
  productsReducer,
  reducer,
});

import * as AT from "./action-types";
import ProductsService from "../../../services/products-service";

const productsService = new ProductsService({});

export const setProductsAC = (payload) => ({
  type: AT.SET_PRODUCTS,
  payload,
});

export const getProductsAC = (payload) => ({
  type: AT.GET_PRODUCTS,
  payload,
});

export const serverGetProductsAC = () => async (dispatch) => {
  const products = await productsService.getProducts();

  return dispatch({
    type: AT.SET_PRODUCTS,
    payload: products,
  });
};
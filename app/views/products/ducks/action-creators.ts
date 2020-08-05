import ProductsService from "@/services/products-service";
import { PRODUCTS_PER_PAGE } from "@/constants/pagination";

import * as AT from "./action-types";

const productsService = new ProductsService({});

export const setProductsAC = (payload) => ({
  type: AT.SET_PRODUCTS,
  payload,
});

export const getProductsAC = (payload) => ({
  type: AT.GET_PRODUCTS,
  payload,
});

export const fetchProductsAC = () => async (dispatch) => {
  const products = await productsService.getProducts();

  return dispatch({
    type: AT.SET_PRODUCTS,
    payload: products,
  });
};

export const serverGetProductByIdAC = (id) => async (dispatch) => {
  const products = await productsService.getProductById(id);

  return dispatch({
    type: AT.SET_CURRENT_PRODUCT,
    payload: products,
  });
};

export const getProductsPageAC = (
  offset,
  perPage = PRODUCTS_PER_PAGE
) => async (dispatch) => {
  const productsPage = await productsService.getProductsPage(offset, perPage);

  return dispatch({
    type: AT.SET_PRODUCTS_PAGE,
    payload: { pageNumber: offset, productsPage },
  });
};

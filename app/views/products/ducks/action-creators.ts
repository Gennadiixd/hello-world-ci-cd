import ProductsService from "@/services/products-service";
import * as CART_AT from "@/views/cart/ducks/action-types";

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

export const fetchProductByIdAC = (id) => async (dispatch) => {
  const products = await productsService.getProductById(id);

  return dispatch({
    type: AT.SET_CURRENT_PRODUCT,
    payload: products,
  });
};

export const fetchProductsAC = ({ page, perPage, filterBy, orderBy }) => async (
  dispatch
) => {
  const productsPage = await productsService.getProducts({
    offset: page,
    perPage,
    filterBy,
    orderBy,
  });

  return dispatch({
    type: AT.SET_PRODUCTS_PAGE,
    payload: { pageNumber: page, ...productsPage },
  });
};

export const fetchProductsByAC = (searchCriteria) => async (dispatch) => {
  let productsSearchState;

  if (searchCriteria) {
    productsSearchState = await productsService.getProducts(searchCriteria);
  } else {
    productsSearchState = [];
  }

  return dispatch({
    type: AT.SET_SEARCH_STATE,
    payload: productsSearchState,
  });
};

export const checkoutAC = (checkoutData, cbf) => async (dispatch) => {
  try {
    await productsService.checkout(checkoutData);
    cbf();

    return dispatch({
      type: CART_AT.CLEAR_CART,
    });
  } catch (error) {
    return dispatch({
      type: CART_AT.SET_CHECKOUT_ERROR,
      payload: error,
    });
  }
};

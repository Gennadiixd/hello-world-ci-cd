import { BaseStore, getOrCreateStore } from "next-mobx-wrapper";
import { observable, action, flow } from "mobx";

import ProductsService from "../services/products-service";

const productsService = new ProductsService({});

class ProductsStore extends BaseStore {
  @observable products = [];

  @action
  fetchProducts = flow(function* () {
    if (this.products) {
      return;
    }

    try {
      const data = yield productsService.getProducts();

      this.products = data;
    } catch (error) {
      throw error;
    }
  });

  @action
  getProducts = () => {
    return this.products;
  };

}

export const getProductsStore = getOrCreateStore("productStore", ProductsStore);

import { BaseStore, getOrCreateStore } from "next-mobx-wrapper";
import { observable, action, flow } from "mobx";

import ProductsService from "../services/products-service";

const productsService = new ProductsService({});

class ProductsStore extends BaseStore {
  @observable products = [];

  fetchProducts = flow(function* () {
    if (this.products.length) return;
    console.log(this.products);

    const data = yield productsService.getProducts();
    
    this.products = data;
    console.log(this.products);
  }).bind(this);

  getProducts = () => {
    return this.products;
  };
}

export const getProductsStore = getOrCreateStore(
  "productsStore",
  ProductsStore
);

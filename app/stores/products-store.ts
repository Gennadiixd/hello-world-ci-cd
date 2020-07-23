import { observable, action } from "mobx";

import ProductsService from "../services/products-service";

const productsService = new ProductsService({});

export class ProductsStore {
  @observable products = [];

  @action
  async getProducts() {
    const products = await productsService.getProducts();
    this.setProducts(products);
  }

  @action
  setProducts(products) {
    this.products = products;
  }

  @action
  createProduct(productData) {
    productsService.createProduct(productData);
  }
}

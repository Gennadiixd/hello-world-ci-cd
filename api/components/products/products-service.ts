import { injectable } from "tsyringe";

import ProductsRepository from "./products-repository";

@injectable()
class ProductsService {
  constructor(public productsRepository: ProductsRepository) {}
  getProducts() {
    // return this.productsRepository.getProducts();
  }
}

// const productsService = new ProductsService();

export default ProductsService;

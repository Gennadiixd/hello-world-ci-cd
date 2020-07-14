import { injectable, inject } from "tsyringe";

import ProductsRepository from "./products-repository";

export interface IProductsService {
  getProducts: () => any;
}

@injectable()
class ProductsService implements IProductsService {
  constructor(@inject("IProductsRepository") public productsRepository: ProductsRepository) {}

  getProducts() {
    return this.productsRepository.getProducts();
  }
}

export default ProductsService;

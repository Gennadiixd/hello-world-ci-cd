import { injectable, inject } from "tsyringe";

import { IProductsRepository } from "./products-repository";

export interface IProductsService {
  getProducts: () => any;
}

@injectable()
class ProductsService implements IProductsService {
  constructor(
    @inject("IProductsRepository")
    public productsRepository: IProductsRepository
  ) {}

  getProducts() {
    return this.productsRepository.getProducts();
  }
}

export default ProductsService;

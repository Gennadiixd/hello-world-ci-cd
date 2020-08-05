import { injectable, inject } from "tsyringe";

import { IProductsRepository } from "./products-repository";

export interface IProductsService {
  getProducts: () => any;
  createProduct: (any: any) => any;
  getProduct: (id) => any;
  getProductsPage: (id) => any;
}

@injectable()
class ProductsService implements IProductsService {
  constructor(
    @inject("IProductsRepository")
    public productsRepository: IProductsRepository
  ) {}

  getProductsPage({ offset, perPage }) {
    return this.productsRepository.getProductsPage({ offset, perPage });
  }

  getProducts() {
    return this.productsRepository.getProducts();
  }

  getProduct(id) {
    return this.productsRepository.getProduct(id);
  }

  createProduct(createProductDTO) {
    return this.productsRepository.createProduct(createProductDTO);
  }
}

export default ProductsService;

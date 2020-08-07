import { injectable, inject } from "tsyringe";

import { IProductsRepository } from "./products-repository";

export interface IProductsService {
  getProducts: (any: any) => any;
  createProduct: (any: any) => any;
  getProduct: (id) => any;
}

@injectable()
class ProductsService implements IProductsService {
  constructor(
    @inject("IProductsRepository")
    public productsRepository: IProductsRepository
  ) {}

  getProducts(GetProductsDTO) {
    return this.productsRepository.getProducts(GetProductsDTO);
  }

  getProduct(id) {
    return this.productsRepository.getProduct(id);
  }

  createProduct(createProductDTO) {
    return this.productsRepository.createProduct(createProductDTO);
  }
}

export default ProductsService;

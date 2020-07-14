import { injectable, inject } from "tsyringe";
import { Response } from "express";

import ProductsService from "./products-service";

export interface IProductsController {
  getProducts: (_: any, res: Response) => void;
}

@injectable()
class ProductsController implements IProductsController {
  constructor(@inject("IProductsService") public productsService: ProductsService) {}

  getProducts = async (_: any, res: Response) => {
    const products = await this.productsService.getProducts();
    res.json(products);
  };
}

export default ProductsController;

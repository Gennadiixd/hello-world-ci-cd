import { injectable } from "tsyringe";

import ProductsService from "./products-service";

@injectable()
class ProductsController {
  constructor(public productsService: ProductsService) {}

  getProducts = async (req, res) => {
    const products = await this.productsService.getProducts();
    res.json(products);
  };
}

export default ProductsController;

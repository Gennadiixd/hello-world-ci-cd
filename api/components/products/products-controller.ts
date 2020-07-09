import { injectable } from "tsyringe";

import ProductsService from "./products-service";

@injectable()
class ProductsController {
  constructor(public productsService: ProductsService) {}

  getProducts(req, res) {
    console.log(this); // undefined ?

    res.json(this.productsService.getProducts());
  }
}

export default ProductsController;

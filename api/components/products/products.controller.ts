import { injectable, inject } from "tsyringe";
import { Response, Request } from "express";

import { IProductsService } from "./products-service";
import { CreateProductDTO } from "./dto/create-product.dto";

export interface IProductsController {
  getProducts: (_: any, res: Response) => void;
  createProduct: (req: Request, res: Response) => void;
}

@injectable()
class ProductsController implements IProductsController {
  constructor(
    @inject("IProductsService") public productsService: IProductsService
  ) {}

  getProducts = async (_: any, res: Response) => {
    const products = await this.productsService.getProducts();
    res.json(products);
  };

  createProduct = async (req: Request, res: Response) => {
    const createProductDTO = new CreateProductDTO(req.body);
    const product = await this.productsService.createProduct(createProductDTO);
    res.json(product);
  };
}

export default ProductsController;

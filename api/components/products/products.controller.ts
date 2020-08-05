import { injectable, inject } from "tsyringe";
import { Response, Request } from "express";

import { IProductsService } from "./products-service";
import { CreateProductDTO } from "./dto/create-product.dto";

export interface IProductsController {
  getProducts: (_: any, res: Response) => void;
  createProduct: (req: Request, res: Response) => void;
  getProduct: (req: Request, res: Response) => void;
  getProductsPage: (req: Request, res: Response) => void;
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

  getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const products = await this.productsService.getProduct(id);
    res.json(products);
  };

  createProduct = async (req: any, res: Response) => {
    const { title, description, price } = req.body;
    const { filename } = req.file;
    const createProductDTO = new CreateProductDTO({
      title,
      description,
      price,
      filename,
    });
    const product = await this.productsService.createProduct(createProductDTO);
    res.json(product);
  };

  getProductsPage = async (req: Request, res: Response) => {
    const { offset, perPage } = req.query;
    const productsPage = await this.productsService.getProductsPage({
      offset,
      perPage,
    });
    
    res.send(productsPage);
  };
}

export default ProductsController;

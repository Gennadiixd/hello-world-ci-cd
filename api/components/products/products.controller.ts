import { injectable, inject } from "tsyringe";
import { Response, Request } from "express";

import { IProductsService } from "./products-service";
import { CreateProductDTO } from "./dto/create-product.dto";
import { GetProductsDTO } from "./dto/get-products.dto";

export interface IProductsController {
  getProducts: (_: any, res: Response) => void;
  createProduct: (req: Request, res: Response) => void;
  getProduct: (req: Request, res: Response) => void;
}

@injectable()
class ProductsController implements IProductsController {
  constructor(
    @inject("IProductsService") public productsService: IProductsService
  ) {}

  getProducts = async (req: Request, res: Response) => {
    const { offset, perPage, title } = req.query as any;
    const getProductsDTO = new GetProductsDTO({
      skip: parseInt(offset, 10) * parseInt(perPage, 10),
      take: perPage,
      title,
    });
    const productsPage = await this.productsService.getProducts(getProductsDTO);

    res.send(productsPage);
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
}

export default ProductsController;

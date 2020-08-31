import { injectable, inject } from "tsyringe";
import { Response, Request } from "express";

import { IOrdersService } from "./orders-service";

export interface IProductsController {
  getOrders: (_: any, res: Response) => void;
  getOrder: (req: Request, res: Response) => void;
  createOrder: (req: Request, res: Response) => void;
}

@injectable()
class ProductsController implements IProductsController {
  constructor(@inject("IOrdersService") public ordersService: IOrdersService) {}

  getOrders = async (req: Request, res: Response) => {
    res.json({ ok: 1 });
  };

  getOrder = async (req: Request, res: Response) => {
    res.json({ ok: 1 });
  };

  createOrder = async (req: any, res: Response) => {
    res.json({ ok: 1 });
  };
}

export default ProductsController;

import { injectable, inject } from "tsyringe";
import { Response, Request } from "express";

import { IOrdersService } from "./orders-service";
import { CreateOrderDTO } from "./dto/create-order.dto";
import { GetOrdersDTO } from "./dto/get-orders.dto";

export interface IProductsController {
  getOrders: (_: any, res: Response) => void;
  getOrder: (req: Request, res: Response) => void;
  createOrder: (req: Request, res: Response) => void;
}

@injectable()
class ProductsController implements IProductsController {
  constructor(@inject("IOrdersService") public ordersService: IOrdersService) {}

  getOrders = async (req: Request, res: Response) => {
    const { userId } = req.query as any;
    const getOrdersDTO = new GetOrdersDTO({ userId });
    const orders = await this.ordersService.getOrders(getOrdersDTO);
    res.json({ orders });
  };

  getOrder = async (req: Request, res: Response) => {
    res.json({ ok: 1 });
  };

  createOrder = async (req: Request, res: Response) => {
    const createOrderDTO = new CreateOrderDTO(req.body);
    const order = await this.ordersService.createOrder(createOrderDTO);
    res.json({ order });
  };
}

export default ProductsController;

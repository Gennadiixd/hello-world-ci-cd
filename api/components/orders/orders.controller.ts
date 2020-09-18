import { injectable, inject } from "tsyringe";
import { Response, Request } from "express";

import { IOrdersService } from "./orders-service";
import { CreateOrderDTO, ICreateOrderDTO } from "./dto/create-order.dto";
import { GetOrdersDTO } from "./dto/get-orders.dto";
import { OrderEntity } from "./order.entity";

export interface IOrdersController {
  getOrders: (req: Request, res: Response) => Promise<void>;
  getOrder: (req: Request, res: Response) => Promise<void>;
  createOrder: (req: Request, res: Response) => Promise<void>;
}

@injectable()
class OrdersController implements IOrdersController {
  constructor(@inject("IOrdersService") public ordersService: IOrdersService) {}

  getOrders = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.query;
    const getOrdersDTO = new GetOrdersDTO({ userId });
    const orders: Array<OrderEntity> = await this.ordersService.getOrders(
      getOrdersDTO
    );
    res.json({ orders });
  };

  getOrder = async (req: Request, res: Response): Promise<void> => {
    const { id }: { id: number } = req.body;
    this.ordersService.getOrder(id);
    res.json({ ok: 1 });
  };

  createOrder = async (req: Request, res: Response): Promise<void> => {
    const createOrderDTO: ICreateOrderDTO = new CreateOrderDTO(req.body);
    const order: OrderEntity = await this.ordersService.createOrder(
      createOrderDTO
    );
    res.json({ order });
  };
}

export default OrdersController;

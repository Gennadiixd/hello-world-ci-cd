import { injectable, inject } from "tsyringe";

import { IOrdersRepository } from "./orders-repository";
import { OrderEntity } from "./order.entity";
import { IGetOrdersDTO } from "./dto/get-orders.dto";
import { ICreateOrderDTO } from "./dto/create-order.dto";

export interface IOrdersService {
  getOrders: (getOrdersDTO: IGetOrdersDTO) => Promise<Array<OrderEntity>>;
  getOrder: (id: number) => Promise<OrderEntity>;
  createOrder: (createOrderDTO: ICreateOrderDTO) => Promise<OrderEntity>;
}

@injectable()
class OrdersService implements IOrdersService {
  constructor(
    @inject("IOrdersRepository")
    public ordersRepository: IOrdersRepository
  ) {}

  async getOrders(getOrdersDTO: IGetOrdersDTO): Promise<Array<OrderEntity>> {
    return this.ordersRepository.getOrders(getOrdersDTO);
  }

  getOrder(id: number): Promise<OrderEntity> {
    return this.ordersRepository.getOrder(id);
  }

  createOrder(createOrderDTO: ICreateOrderDTO): Promise<OrderEntity> {
    return this.ordersRepository.createOrder(createOrderDTO);
  }
}

export default OrdersService;

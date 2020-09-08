import { injectable, inject } from "tsyringe";

import { IOrdersRepository } from "./orders-repository";

export interface IOrdersService {
  getOrders: (any: any) => any;
  getOrder: (any: any) => any;
  createOrder: (any: any) => any;
}

@injectable()
class OrdersService implements IOrdersService {
  constructor(
    @inject("IOrdersRepository")
    public ordersRepository: IOrdersRepository
  ) {}

  getOrders(getOrdersDTO) {
    return this.ordersRepository.getOrders(getOrdersDTO);
  }

  getOrder(id) {
    return this.ordersRepository.getOrder(id);
  }

  createOrder(createOrderDTO) {
    return this.ordersRepository.createOrder(createOrderDTO);
  }
}

export default OrdersService;

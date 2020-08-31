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

  getOrders(GetProductsDTO) {
    return this.ordersRepository.getOrders(GetProductsDTO);
  }

  getOrder(id) {
    return this.ordersRepository.getOrder(id);
  }

  createOrder(createProductDTO) {
    return this.ordersRepository.createOrder(createProductDTO);
  }
}

export default OrdersService;

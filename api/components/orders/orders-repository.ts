import { Repository, EntityRepository } from "typeorm";
import { injectable, inject } from "tsyringe";

import { OrderEntity } from "./order.entity";
import { IDBConnection } from "../../connection";

export interface IOrdersRepository {
  getOrders: (any: any) => any;
  getOrder: (any: any) => any;
  createOrder: (any: any) => any;
}

@injectable()
@EntityRepository(OrderEntity)
class ProductsRepository extends Repository<any> {
  constructor(@inject("IDBConnection") private dbConnection: IDBConnection) {
    super();
  }

  async getConnectManager() {
    const { manager } = await this.dbConnection.getConnection();
    return manager;
  }

  async getRepository() {
    const connection = await this.dbConnection.getConnection();
    return connection.getRepository(OrderEntity);
  }

  async getOrders(getOrdersDTO) {
    const repository = await this.getRepository();
    const orders = await repository.find(OrderEntity);

    return orders;
  }

  async getOrder(id) {
    const connectionManager = await this.getConnectManager();
    return connectionManager.findOne(OrderEntity, id);
  }

  async createOrder(createOrderDTO) {
  }
}

export default ProductsRepository;

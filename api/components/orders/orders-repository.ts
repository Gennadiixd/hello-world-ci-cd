import { Repository, EntityRepository, getManager } from "typeorm";
import { injectable, inject } from "tsyringe";

import { OrderEntity } from "./order.entity";
import { IDBConnection } from "../../db/connection";
import { OrderToProductsEntity } from "../junctions/order_to_products.entity";

export interface IOrdersRepository {
  getOrders: (any: any) => any;
  getOrder: (any: any) => any;
  createOrder: (any: any) => any;
}

@injectable()
@EntityRepository(OrderEntity)
class OrdersRepository extends Repository<OrderEntity> {
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
    const orders = await repository.find({
      ...getOrdersDTO.params,
      relations: ["order_to_products", "order_to_products.product"],
    });
    return orders;
  }

  async getOrder(id) {
    const connectionManager = await this.getConnectManager();
    return connectionManager.findOne(OrderEntity, id);
  }

  async createOrder(createOrderDTO) {
    const {
      user_id,
      total_products_count,
      total_price,
      products,
    } = createOrderDTO;

    const order = new OrderEntity();

    order.user_id = user_id;
    order.total_products_count = total_products_count;
    order.total_price = total_price;

    await order.save();

    const order_to_products = products.map(({ productQuantity, id }) => {
      const order_to_product = new OrderToProductsEntity();
      order_to_product.product_id = id;
      order_to_product.order_id = order.id;
      order_to_product.product_quantity = productQuantity;
      return order_to_product;
    });

    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(order_to_products);
    });

    return order;
  }
}

export default OrdersRepository;

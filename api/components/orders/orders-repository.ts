import { Repository, EntityRepository, getManager } from "typeorm";
import { injectable, inject } from "tsyringe";

import { OrderEntity } from "./order.entity";
import { IDBConnection } from "../../connection";
import { MapOrdersProductsEntity } from "../mappings/map_orders_products.entity";

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
    const orders = await repository.find(getOrdersDTO.params);
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
      products_ids,
    } = createOrderDTO;

    const order = new OrderEntity();

    order.user_id = user_id;
    order.total_products_count = total_products_count;
    order.total_price = total_price;

    await order.save();

    const map_orders_products = products_ids.map(({ productsQuantity, id }) => {
      const map_order_product = new MapOrdersProductsEntity();
      map_order_product.product_id = id;
      map_order_product.order_id = order.id;
      map_order_product.products_quantity = productsQuantity;
      return map_order_product;
    });

    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(map_orders_products);
    });

    return order;
  }
}

export default OrdersRepository;

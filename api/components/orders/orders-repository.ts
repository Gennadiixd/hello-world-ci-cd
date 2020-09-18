import { Repository, EntityRepository, getManager, Connection } from "typeorm";
import { injectable, inject } from "tsyringe";

import { OrderEntity } from "./order.entity";
import { IDBConnection } from "../../db/connection";
import { OrderToProductsEntity } from "../junctions/order_to_products.entity";
import { ICreateOrderDTO } from "./dto/create-order.dto";
import { IGetOrdersDTO } from "./dto/get-orders.dto";

export interface IOrdersRepository {
  getOrders: (getOrdersDTO: IGetOrdersDTO) => Promise<Array<OrderEntity>>;
  getOrder: (id: number) => Promise<OrderEntity>;
  createOrder: (createOrderDTO: ICreateOrderDTO) => Promise<OrderEntity>;
}

@injectable()
@EntityRepository(OrderEntity)
class OrdersRepository
  extends Repository<OrderEntity>
  implements IOrdersRepository {
  constructor(@inject("IDBConnection") private dbConnection: IDBConnection) {
    super();
  }

  async getConnectManager() {
    const { manager } = await this.dbConnection.getConnection();
    return manager;
  }

  async getRepository(): Promise<Repository<OrderEntity>> {
    const connection: Connection = await this.dbConnection.getConnection();
    return connection.getRepository(OrderEntity);
  }

  async getOrders(getOrdersDTO: IGetOrdersDTO): Promise<Array<OrderEntity>> {
    const repository: Repository<OrderEntity> = await this.getRepository();
    const orders: Array<OrderEntity> = await repository.find({
      ...getOrdersDTO.params,
      relations: ["order_to_products", "order_to_products.product"],
    });

    return orders;
  }

  async getOrder(id): Promise<OrderEntity> {
    // TODO: use only repository
    const connectionManager = await this.getConnectManager();
    return connectionManager.findOne(OrderEntity, id);
  }

  async createOrder(createOrderDTO: ICreateOrderDTO): Promise<OrderEntity> {
    const {
      user_id,
      total_products_count,
      total_price,
      products,
    } = createOrderDTO;

    const order: OrderEntity = new OrderEntity();

    order.user_id = user_id;
    order.total_products_count = total_products_count;
    order.total_price = total_price;

    await order.save();

    const order_to_products: Array<OrderToProductsEntity> = products.map(
      ({ productQuantity, id }) => {
        const order_to_product: OrderToProductsEntity = new OrderToProductsEntity();
        order_to_product.product_id = id;
        order_to_product.order_id = order.id;
        order_to_product.product_quantity = productQuantity;
        return order_to_product;
      }
    );

    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(order_to_products);
    });

    return order;
  }
}

export default OrdersRepository;

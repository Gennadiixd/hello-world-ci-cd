import { BaseEntity, Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { OrderEntity } from "../orders/order.entity";

@Entity({ name: "map_orders_products" })
export class MapOrdersProductsEntity extends BaseEntity {
  @ManyToOne((type) => OrderEntity, (orderEntity) => orderEntity.id, {
    eager: false,
  })
  @PrimaryColumn()
  order_id: number;

  @PrimaryColumn()
  product_id: number;

  @Column()
  products_quantity: number;
}

import {
  BaseEntity,
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { OrderEntity } from "../orders/order.entity";
import { ProductEntity } from "../products/product.entity";

@Entity({ name: "order_to_products" })
export class OrderToProductsEntity extends BaseEntity {
  @PrimaryColumn()
  order_id: number;

  @PrimaryColumn()
  product_id: number;

  @Column()
  product_quantity: number;

  @Column()
  product_price: number;

  @ManyToOne((type) => OrderEntity, (order) => order.order_to_products)
  @JoinColumn({ name: "order_id" })
  order: OrderEntity;

  @ManyToOne((type) => ProductEntity, (product) => product.order_to_products)
  @JoinColumn({ name: "product_id" })
  product: ProductEntity;
}

import { BaseEntity, Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { OrderEntity } from "../orders/order.entity";
import { ProductEntity } from "../products/product.entity";

@Entity({ name: "orders_to_products" })
export class OrdersToProductsEntity extends BaseEntity {
  @PrimaryColumn()
  order_id: number;

  @PrimaryColumn()
  product_id: number;

  @Column()
  products_quantity: number;

  @Column()
  product_price: number;

  @ManyToOne((type) => OrderEntity, (order) => order.orders_to_products)
  @JoinColumn({name : 'order_id'})
  order: OrderEntity;

  @ManyToOne((type) => ProductEntity, (product) => product.orders_to_products)
  @JoinColumn({name : 'product_id'})
  product: ProductEntity;
}

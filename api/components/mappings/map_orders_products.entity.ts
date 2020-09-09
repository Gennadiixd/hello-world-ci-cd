import { BaseEntity, Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";

@Entity({ name: "map_orders_products" })
export class MapOrdersProductsEntity extends BaseEntity {
  @PrimaryColumn()
  order_id: number;

  @PrimaryColumn()
  product_id: number;

  @Column()
  products_quantity: number;

  // @Column()
  // product_price: number;
}

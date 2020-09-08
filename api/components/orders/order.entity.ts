import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { MapOrdersProductsEntity } from "../mappings/map_orders_products.entity";

@Entity({ name: "orders" })
export class OrderEntity extends BaseEntity {
  @ManyToMany(
    (type) => MapOrdersProductsEntity,
    (mapOrdersProductsEntity) => mapOrdersProductsEntity.order_id,
    { eager: true }
  )
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total_price: number;

  @Column()
  total_products_count: number;

  @Column()
  user_id: number;
}

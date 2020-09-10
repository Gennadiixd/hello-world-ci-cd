import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { OrdersToProductsEntity } from "../junctions/orders_to_products.entity";

@Entity({ name: "products" })
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  rate: string;

  @Column()
  category: number;

  @OneToMany(
    (type) => OrdersToProductsEntity,
    (ordersToProductsEntity) => ordersToProductsEntity.product
  )
  @JoinColumn({ name: "id" })
  orders_to_products: OrdersToProductsEntity[];
}

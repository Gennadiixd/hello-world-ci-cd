import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { OrderToProductsEntity } from "../junctions/order_to_products.entity";

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
    (type) => OrderToProductsEntity,
    (orderToProductsEntity) => orderToProductsEntity.product
  )
  @JoinColumn({ name: "id" })
  order_to_products: OrderToProductsEntity[];
}

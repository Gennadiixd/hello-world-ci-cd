import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { OrderToProductsEntity } from "../junctions/order_to_products.entity";
import { ProductEntity } from "../products/product.entity";
import { UserEntity } from "../users/user.entity";

@Entity({ name: "orders" })
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total_price: number;

  @Column()
  total_products_count: number;

  @Column()
  user_id: number;

  @ManyToMany((type) => ProductEntity, (productEntity) => productEntity.id)
  @JoinTable({
    name: "order_to_products",
    joinColumn: {
      name: "order_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "product_id",
      referencedColumnName: "id",
    },
  })
  products: ProductEntity[];

  @OneToMany(
    (type) => OrderToProductsEntity,
    (orderToProductsEntity) => orderToProductsEntity.order
  )
  order_to_products: OrderToProductsEntity[];

  @OneToOne((type) => UserEntity, { eager: true })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}

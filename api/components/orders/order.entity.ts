import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { OrdersToProductsEntity } from "../junctions/orders_to_products.entity";
import { ProductEntity } from "../products/product.entity";

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
    name: "orders_to_products",
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
    (type) => OrdersToProductsEntity,
    (ordersToProductsEntity) => ordersToProductsEntity.order
  )
  orders_to_products: OrdersToProductsEntity[];
}

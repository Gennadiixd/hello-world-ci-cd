import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { MapOrdersProductsEntity } from "../mappings/map_orders_products.entity";
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

  @ManyToMany((type) => ProductEntity, (productEntity) => productEntity.id, {
    eager: true,
  })
  @JoinTable({
    name: "map_orders_products",
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
}

import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { OrderToProductsEntity } from "../junctions/order_to_products.entity";

@Entity({ name: "addresses" })
export class AddressEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  index: string;

  @Column()
  street_name: string;

  @Column()
  home_number: string;
}

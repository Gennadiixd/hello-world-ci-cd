import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { UserEntity } from "../users/user.entity";

@Entity({ name: "orders" })
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @ManyToOne((type) => UserEntity, (user) => user.order_ids, { eager: false })
  user_id: UserEntity;

  @Column()
  product_ids: Array<string>;
}

import { OrderEntity } from "./../orders/order.entity";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany((type) => OrderEntity, (order) => order.user_id, { eager: true })
  order_ids: OrderEntity[];
}

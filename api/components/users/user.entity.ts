import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { AddressEntity } from "./address.entity";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  first_name: string;

  @Column()
  second_name: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address_id: number;

  @Column()
  contact_id: number;

  @OneToOne((type) => AddressEntity, { eager: true })
  @JoinColumn({ name: "address_id" })
  address: AddressEntity;
}

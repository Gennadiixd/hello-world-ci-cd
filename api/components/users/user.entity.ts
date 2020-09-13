import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { ContactEntity } from "./contact.entity";
import { AddressEntity } from "./address.entity";

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

  @Column()
  address_id: number;

  @Column()
  contact_id: number;

  @OneToOne((type) => ContactEntity, { eager: true })
  @JoinColumn({ name: "contact_id" })
  contact: ContactEntity;

  @OneToOne((type) => AddressEntity, { eager: true })
  @JoinColumn({ name: "address_id" })
  address: AddressEntity;
}

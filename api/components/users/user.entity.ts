import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: "users"})
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  role: string;
}

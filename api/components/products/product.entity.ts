import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}

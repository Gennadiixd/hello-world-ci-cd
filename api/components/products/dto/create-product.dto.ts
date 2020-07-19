import { IsNotEmpty } from "class-validator";

export class CreateProductDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: string;

  constructor({ title, description, price }) {
    this.title = title;
    this.description = description;
    this.price = price;
  }
}

import { IsNotEmpty } from "class-validator";

export class CreateProductDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  image: string;

  constructor({ title, description, price, filename }) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.image = filename;
  }
}

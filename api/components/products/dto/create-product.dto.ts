export class CreateProductDTO {
  title: string;

  description: string;

  price: number;

  image: string;

  constructor({ title, description, price, filename }) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.image = filename;
  }
}

import { IsNotEmpty } from "class-validator";

export class CreateOrderDTO {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  total_products_count: number;

  @IsNotEmpty()
  total_price: number;

  @IsNotEmpty()
  products_ids: Array<any>;

  constructor({ userId, totalProductsCount, totalPrice, products_ids }) {
    this.user_id = userId;
    this.total_products_count = totalProductsCount;
    this.total_price = totalPrice;
    this.products_ids = products_ids;
  }
}

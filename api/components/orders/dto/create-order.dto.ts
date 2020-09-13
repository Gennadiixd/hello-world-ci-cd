export class CreateOrderDTO {
  user_id: number;

  total_products_count: number;

  total_price: number;

  products: Array<any>;

  constructor({ userId, totalProductsCount, totalPrice, products }) {
    this.user_id = userId;
    this.total_products_count = totalProductsCount;
    this.total_price = totalPrice;
    this.products = products;
  }
}

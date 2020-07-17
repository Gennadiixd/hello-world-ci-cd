import HttpService from "./core/http-service";

export default class ProductsService extends HttpService {
  constructor(options) {
    super(options);
  }

  getProducts(): Promise<{ data: any }> {
    return this.get("products");
  }
}

import HttpService from "./core/http-service";

export default class ProductsService extends HttpService {
  constructor(options) {
    super(options);
  }

  async getProducts(): Promise<{ data: any }> {
    const { data } = await this.get("products");

    return data;
  }

  async getProductById(id): Promise<{ data: any }> {
    const { data } = await this.get(`products/${id}`);

    return data;
  }

  createProduct(product): Promise<{ data: any }> {
    return this.post("products", product);
  }
}

import HttpService from "./core/http-service";

export default class ProductsService extends HttpService {
  constructor(options) {
    super(options);
  }

  async getProducts(searchParams): Promise<{ data: any }> {
    const { data } = await this.get("products", { params: searchParams });

    return data;
  }

  async getProductById(id): Promise<{ data: any }> {
    const { data } = await this.get(`products/${id}`);

    return data;
  }

  createProduct(productData): Promise<{ data: any }> {
    return this.post("products", productData);
  }
}

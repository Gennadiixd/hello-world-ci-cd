import HttpService from "./core/http-service";

type getProductsArgs = {
  offset?: number;
  perPage?: number;
  title?: string;
};

export default class ProductsService extends HttpService {
  constructor(options) {
    super(options);
  }

  async getProducts({
    offset,
    perPage,
    ...rest
  }: getProductsArgs): Promise<{ data: any }> {
    const params = offset && perPage ? { offset, perPage } : { ...rest };
    const { data } = await this.get("products", { params });

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

import "reflect-metadata";
import { container } from "tsyringe";
import ProductsService from "./components/products/products-service";
import { IProductsRepository } from "./components/products/products-repository";

class mockProductsRepository implements IProductsRepository {
  getProducts() {
    return "success";
  }
  createProduct: (any) => "product";
  getProduct: (any) => "product";
  getProductsPage: (any) => "product";
}

container.register("IProductsRepository", {
  useClass: mockProductsRepository,
});

describe("App", () => {
  it("should return success", async (done) => {
    const productsService = container.resolve(ProductsService);
    expect(productsService.getProducts()).toBe("success");
    done();
  });
});

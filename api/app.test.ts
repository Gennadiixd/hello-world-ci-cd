import "reflect-metadata";
import { container } from "tsyringe";
import ProductsService from "./components/products/products-service";
import { IProductsRepository } from "./components/products/products-repository";

class mockProductsRepository implements IProductsRepository {
  getProducts() {
    return "success";
  }
}

container.register("IProductsRepository", {
  useClass: mockProductsRepository,
});

describe("App", () => {
  process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason)
  });
  it("should return success", async (done) => {
    const productsService = container.resolve(ProductsService);
    expect(productsService.getProducts()).toBe("success");
    done();
  });
});

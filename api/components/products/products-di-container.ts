import ProductsRegistry from "./products-registry";
import AuthGuard from "../../lib/auth/auth-guard";
import ProductsController from "./products.controller";

export default class ProductsDIContainer {
  registry;
  container;
  constructor(container) {
    this.container = container;
    this.registry = new ProductsRegistry(container);
    this.registry.registerDependencies();
  }

  resolveAuthGuard() {
    return this.container.resolve(AuthGuard);
  }

  resolveProductsController() {
    return this.container.resolve(ProductsController);
  }
}

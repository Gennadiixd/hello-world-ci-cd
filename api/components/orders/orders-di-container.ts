import OrdersRegistry from "./orders-registry";
import AuthGuard from "../../lib/auth/auth-guard";
import OrdersController from "./orders.controller";

export default class OrdersDIContainer {
  registry;
  container;
  constructor(container) {
    this.container = container;
    this.registry = new OrdersRegistry(container);
    this.registry.registerDependencies();
  }

  resolveAuthGuard() {
    return this.container.resolve(AuthGuard);
  }

  resolveOrdersController() {
    return this.container.resolve(OrdersController);
  }
}

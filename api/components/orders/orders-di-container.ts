import { IAuthGuard } from "./../../lib/auth/auth-guard";
import OrdersRegistry from "./orders-registry";
import AuthGuard from "../../lib/auth/auth-guard";
import OrdersController from "./orders.controller";
import { IOrdersController } from "./orders.controller";

export default class OrdersDIContainer {
  registry;
  container;
  constructor(container) {
    this.container = container;
    this.registry = new OrdersRegistry(container);
    this.registry.registerDependencies();
  }

  resolveAuthGuard(): IAuthGuard {
    return this.container.resolve(AuthGuard);
  }

  resolveOrdersController(): IOrdersController {
    return this.container.resolve(OrdersController);
  }
}

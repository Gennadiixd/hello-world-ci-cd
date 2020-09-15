import UsersRegistry from "./users-registry";
import UsersController from "./users.controller";
import { IUsersController } from "./users.controller";
import { DependencyContainer } from "tsyringe";

export default class UsersDIContainer {
  registry;
  container;
  constructor(container : DependencyContainer) {
    this.container = container;
    this.registry = new UsersRegistry(container);
    this.registry.registerDependencies();
  }

  resolveUsersController(): IUsersController {
    return this.container.resolve(UsersController);
  }
}

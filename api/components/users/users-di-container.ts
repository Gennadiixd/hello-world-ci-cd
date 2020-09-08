import UsersRegistry from "./users-registry";
import UsersController from "./users.controller";

export default class UsersDIContainer {
  registry;
  container;
  constructor(container) {
    this.container = container;
    this.registry = new UsersRegistry(container);
    this.registry.registerDependencies();
  }

  resolveUsersController() {
    return this.container.resolve(UsersController);
  }
}

import SessionRegistry from "./session-registry";
import SessionController from "./session-controller";

export default class SessionDIContainer {
  registry;
  container;
  constructor(container) {
    this.container = container;
    this.registry = new SessionRegistry(container);
    this.registry.registerDependencies();
  }

  resolveSessionController() {
    return this.container.resolve(SessionController);
  }
}

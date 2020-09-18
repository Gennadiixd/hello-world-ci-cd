import Config from "./";

export default class ConfigRegistry {
  container: any;
  constructor(container) {
    this.container = container;
    this.registerConfig();
  }

  registerConfig() {
    this.register("IConfig", Config);
  }

  register(token, Class) {
    this.container.register(token, {
      useClass: Class,
    });
  }
}

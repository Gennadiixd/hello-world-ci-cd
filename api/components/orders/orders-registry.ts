import OrdersService from "./orders-service";
import OrdersRepository from "./orders-repository";
import DBConnection from "../../connection";
import TGMessenger from "../telegram/tg-messenger";
import TGTemplater from "../telegram/tg-templater";
import ConfigRegistry from "../config/config-registry";

export default class ProductsRegistry extends ConfigRegistry {
  constructor(container) {
    super(container);
  }

  registerDependencies() {
    this.register("IOrdersService", OrdersService);
    this.register("IOrdersRepository", OrdersRepository);
    this.register("IDBConnection", DBConnection);
    this.register("ITGMessenger", TGMessenger);
    this.register("ITGTemplater", TGTemplater);
  }
}

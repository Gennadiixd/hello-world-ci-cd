import ProductsService from "./products-service";
import ProductsRepository from "./products-repository";
import DBConnection from "../../db/connection";
import TGMessenger from "../../lib/telegram/tg-messenger";
import TGTemplater from "../../lib/telegram/tg-templater";
import ConfigRegistry from "../config/config-registry";

export default class ProductsRegistry extends ConfigRegistry {
  constructor(container) {
    super(container);
  }

  registerDependencies() {
    this.register("IProductsService", ProductsService);
    this.register("IProductsRepository", ProductsRepository);
    this.register("IDBConnection", DBConnection);
    this.register("ITGMessenger", TGMessenger);
    this.register("ITGTemplater", TGTemplater);
  }
}

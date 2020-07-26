import "reflect-metadata";
import { Router } from "express";
import { container } from "tsyringe";

import ProductsController from "./products.controller";
import ProductsService from "./products-service";
import ProductsRepository from "./products-repository";
import DBConnection from "../../connection";
import AuthGuard from "../auth/auth-guard";

const { isAuthenticated } = new AuthGuard();

container.register("IProductsService", {
  useClass: ProductsService,
});

container.register("IProductsRepository", {
  useClass: ProductsRepository,
});

container.register("IDBConnection", {
  useClass: DBConnection,
});

const productsRouter = Router();
const productsController = container.resolve(ProductsController);

productsRouter.get("/", productsController.getProducts);
productsRouter.get("/:id", productsController.getProduct);

productsRouter.post("/", isAuthenticated, productsController.createProduct);

export default productsRouter;

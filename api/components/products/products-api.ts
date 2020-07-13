import "reflect-metadata";
import { Router } from "express";
import { container } from "tsyringe";

import ProductsController from "./products-controller";
import ProductsService from "./products-service";
import ProductsRepository from "./products-repository";

container.register("IProductsService", {
  useClass: ProductsService,
});

container.register("IProductsRepository", {
  useClass: ProductsRepository,
});

const productsRouter = Router();
const productsController = container.resolve(ProductsController);

productsRouter.get("/", productsController.getProducts);

export default productsRouter;

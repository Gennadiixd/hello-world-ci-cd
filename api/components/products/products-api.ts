import "reflect-metadata";
import { Router } from "express";
import { container } from "tsyringe";

import ProductsController from "./products-controller";

const productsRouter = Router();
const productsController = container.resolve(ProductsController);

productsRouter.get(
  "/",
  productsController.getProducts.bind(productsController)
);

export default productsRouter;

import "reflect-metadata";
import { Router } from "express";
import { container } from "tsyringe";

import ProductsController from "./products-controller";

const productsRouter = Router();
const productsController = container.resolve(ProductsController);

console.log(productsController);

productsRouter.get("/", productsController.getProducts);

export default productsRouter;

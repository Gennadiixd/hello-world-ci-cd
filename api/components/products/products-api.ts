import { Router } from "express";
const productsRouter = Router();
import productsController from "./products-controller";

productsRouter.get("/", productsController.getProducts);

export default productsRouter;

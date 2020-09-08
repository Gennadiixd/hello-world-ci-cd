import "reflect-metadata";
import { Router } from "express";
import { container } from "tsyringe";
import ProductsDIContainer from "./products-di-container";
import PersistStorage from "../../DAL/persist-storage";

const { uploadSingleImage } = new PersistStorage();

const productsDIContainer = new ProductsDIContainer(container);

const { isAuthenticated } = productsDIContainer.resolveAuthGuard();
const {
  getProducts,
  getProduct,
  checkout,
  createProduct,
} = productsDIContainer.resolveProductsController();

const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProduct);
productsRouter.post("/checkout", checkout);

productsRouter.post("/", isAuthenticated, uploadSingleImage(), createProduct);

export default productsRouter;

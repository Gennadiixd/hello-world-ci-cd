import "reflect-metadata";
import { Router } from "express";
import { container } from "tsyringe";
import multer from "multer";
import path from "path";

import ProductsController from "./products.controller";
import ProductsService from "./products-service";
import ProductsRepository from "./products-repository";
import DBConnection from "../../connection";
import AuthGuard from "../auth/auth-guard";

const { isAuthenticated } = new AuthGuard();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, "/images/product/" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

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
productsRouter.get("/page", productsController.getProductsPage);
productsRouter.get("/:id", productsController.getProduct);

productsRouter.post(
  "/",
  isAuthenticated,
  upload.single("image"),
  productsController.createProduct
);

export default productsRouter;

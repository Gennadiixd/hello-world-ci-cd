import "reflect-metadata";
import { Router } from "express";
import { container } from "tsyringe";

import OrdersController from "./orders.controller";
import OrdersService from "./orders-service";
import OrdersRepository from "./orders-repository";
import DBConnection from "../../connection";
import AuthGuard from "../auth/auth-guard";
import Config from "../config/index";

container.register("IOrdersService", {
  useClass: OrdersService,
});

container.register("IOrdersRepository", {
  useClass: OrdersRepository,
});

container.register("IDBConnection", {
  useClass: DBConnection,
});

container.register("IConfig", {
  useClass: Config,
});

const { isAuthenticated } = container.resolve(AuthGuard);

const ordersRouter = Router();
const ordersController = container.resolve(OrdersController);

ordersRouter.get("/", isAuthenticated, ordersController.getOrders);
ordersRouter.get("/:id", isAuthenticated, ordersController.getOrder);
ordersRouter.post("/", isAuthenticated, ordersController.createOrder);

export default ordersRouter;

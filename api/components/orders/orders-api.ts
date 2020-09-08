import "reflect-metadata";
import { Router } from "express";
import { container } from "tsyringe";
import OrdersDIContainer from "./orders-di-container";

const ordersDIContainer = new OrdersDIContainer(container);

const { isAuthenticated } = ordersDIContainer.resolveAuthGuard();
const {
  getOrders,
  getOrder,
  createOrder,
} = ordersDIContainer.resolveOrdersController();

const ordersRouter = Router();

// ordersRouter.get("/", isAuthenticated, getOrders);
// ordersRouter.get("/:id", isAuthenticated, getOrder);
// ordersRouter.post("/", isAuthenticated, createOrder);

ordersRouter.get("/", getOrders);
ordersRouter.get("/:id", getOrder);
ordersRouter.post("/", createOrder);

export default ordersRouter;

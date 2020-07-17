import "reflect-metadata";
import { Router } from "express";
import { container } from "tsyringe";

import UsersController from "./users.controller";
import UsersService from "./users-service";
import DBConnection from "../../connection";
import UsersRepository from "./users-repository";
import AuthGuard from "../auth/auth-guard";

const { isAuthenticated } = new AuthGuard();

container.register("IUsersService", {
  useClass: UsersService,
});

container.register("IUsersRepository", {
  useClass: UsersRepository,
});

container.register("IDBConnection", {
  useClass: DBConnection,
});

container.register("IAuthGuard", {
  useClass: AuthGuard,
});

const productsRouter = Router();
const usersController = container.resolve(UsersController);

productsRouter.get(
  "/authorize",
  // isAuthenticated,
  usersController.authorizeUser
);

productsRouter.get("/login", usersController.loginUser);

export default productsRouter;

import "reflect-metadata";
import { Router } from "express";
import { container } from "tsyringe";

import UsersDIContainer from "./users-di-container";

const usersDIContainer = new UsersDIContainer(container);

const usersRouter = Router();
const {
  createUser,
  updateUser,
  deleteUser,
} = usersDIContainer.resolveUsersController();

usersRouter.post("/", createUser);
usersRouter.patch("/", updateUser);
usersRouter.delete("/", deleteUser);

export default usersRouter;

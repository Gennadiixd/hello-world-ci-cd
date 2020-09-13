import "reflect-metadata";
import { Router } from "express";
import { container } from "tsyringe";

import UsersDIContainer from "./users-di-container";
import getUserValidation from "./validations/get-user";

const usersDIContainer = new UsersDIContainer(container);

const usersRouter = Router();
const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
} = usersDIContainer.resolveUsersController();

usersRouter.post("/", createUser);
usersRouter.get("/", getUserValidation(), getUser);
usersRouter.patch("/", updateUser);
usersRouter.delete("/", deleteUser);

export default usersRouter;

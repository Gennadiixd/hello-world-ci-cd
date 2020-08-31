import { Router } from "express";
import { container } from "tsyringe";

import SessionController from "./session-controller";
import UsersService from "../users/users-service";
import AuthGuard from "../auth/auth-guard";
import Config from "../config/index";

container.register("IUsersService", {
  useClass: UsersService,
});

container.register("IAuthGuard", {
  useClass: AuthGuard,
});

container.register("IConfig", {
  useClass: Config,
});

const sessionRouter = Router();

const sessionController = container.resolve(SessionController);

sessionRouter.get("/", sessionController.getSession);
sessionRouter.post("/", sessionController.createSession);
sessionRouter.delete("/", sessionController.destroySession);

export default sessionRouter;

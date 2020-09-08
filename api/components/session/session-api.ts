import { Router } from "express";
import { container } from "tsyringe";
import SessionDIContainer from "./session-di-container";

const sessionDIContainer = new SessionDIContainer(container);

const sessionRouter = Router();

const {
  getSession,
  createSession,
  destroySession,
} = sessionDIContainer.resolveSessionController();

sessionRouter.get("/", getSession);
sessionRouter.post("/", createSession);
sessionRouter.delete("/", destroySession);

export default sessionRouter;

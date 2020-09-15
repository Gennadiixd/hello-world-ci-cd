import { validationResult } from "express-validator";
import { Response, Request } from "express";

export default class ControllerProto {
  validationHook(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }
}

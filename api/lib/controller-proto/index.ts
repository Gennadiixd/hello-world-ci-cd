import { validationResult } from "express-validator";

export default class ControllerProto {
  validationHook(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }
}

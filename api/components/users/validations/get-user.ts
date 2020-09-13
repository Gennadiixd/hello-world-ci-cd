import { body, oneOf } from "express-validator";

function getUserValidation() {
  return oneOf([body("id").notEmpty(), body("name").notEmpty()]);
}

export default getUserValidation;

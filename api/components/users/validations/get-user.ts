import { body, oneOf } from "express-validator";

const getUserValidation = oneOf([
  body("id").notEmpty(),
  body("name").notEmpty(),
]);

export default getUserValidation;

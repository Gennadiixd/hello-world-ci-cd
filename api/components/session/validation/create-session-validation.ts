import { body } from "express-validator";

const createSessionValidation = [
  body("name").notEmpty(),
  body("password").notEmpty(),
];

export default createSessionValidation;

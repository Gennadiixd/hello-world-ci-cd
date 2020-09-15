import { body } from "express-validator";

const createUserValidation = [
  body("userData.email").notEmpty().isEmail(),
  body("userData.names").notEmpty(),
  body("userData.password").notEmpty(),
  body("userData.first_name").notEmpty(),
  body("userData.second_name").notEmpty(),

  body("addressData.city").notEmpty(),
  body("addressData.index").notEmpty(),
  body("addressData.street_name").notEmpty(),
  body("addressData.home_number").notEmpty(),
];

export default createUserValidation;

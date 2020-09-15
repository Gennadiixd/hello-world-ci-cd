import { body } from "express-validator";

const VALIDATION_FIELDS_MAP = {
  email: "isEmail",
};

const getLeafFieldName = (filedName) => filedName.split(".").pop();

export const getRequireFieldMessage = (filedName: string): string =>
  `Field ${getLeafFieldName(filedName)} is required`;

export const getValidationFields = (obj, parent = "") =>
  Object.keys(obj).reduce((accum, key) => {
    if (typeof obj[key] === "object") {
      accum.push(
        ...getValidationFields(obj[key], `${parent ? parent + "." : ""}${key}`)
      );
    } else {
      accum.push(`${parent}.${obj[key]}`);
    }
    return accum;
  }, []);

export const createValidation = (fields) =>
  getValidationFields(fields).map((field) => {
    const additionalValidation = VALIDATION_FIELDS_MAP[getLeafFieldName(field)];

    if (additionalValidation) {
      return body(field).notEmpty()[additionalValidation]();
    }
    return body(field, getRequireFieldMessage(field)).notEmpty();
  });

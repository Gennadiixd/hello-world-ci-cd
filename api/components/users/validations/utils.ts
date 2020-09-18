// TODO: remove if will not use
import { body } from "express-validator";

const VALIDATION_FIELDS_MAP = {
  email: [{ func: "isEmail", params: [] }],
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

export const createValidation = (fields) => {
  return getValidationFields(fields).map((field) => {
    const additionalValidation = VALIDATION_FIELDS_MAP[getLeafFieldName(field)];
    let validation = body(field);

    if (additionalValidation) {
      additionalValidation.map(({ func, params }) => {
        validation = validation[func](...params);
      });
      return validation;
    }

    return body(field, getRequireFieldMessage(field)).notEmpty();
  });
};

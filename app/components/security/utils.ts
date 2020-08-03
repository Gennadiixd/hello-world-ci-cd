import jwt from "jsonwebtoken";

export const decodeJWT = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return undefined;
  }
};
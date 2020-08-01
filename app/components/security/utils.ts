import jwt from "jsonwebtoken";

export const decodeJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return undefined;
  }
};
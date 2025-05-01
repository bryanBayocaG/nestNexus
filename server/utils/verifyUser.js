import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  //access_token ang pinangalan ko sa pag add ng mga cookie sa authcontrollers
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized request!"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(403, "Forbidden hehe"));
    }
    req.user = user;
    next();
  });
};

import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtAuth";

export const authenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  const routeUserId = req.params.id;

  if (token) {
    try {
      verifyToken(token, routeUserId);

      next();
    } catch (error) {
      return res.status(401).json({ message: "Token inválido." });
    }
  } else {
    return res.status(401).json({ message: "Token não fornecido." });
  }
};

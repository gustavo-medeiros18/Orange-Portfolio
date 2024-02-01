import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET as string;

const CONFIG: SignOptions = {
  expiresIn: "1d",
  algorithm: "HS256",
};

export const generateToken = (payload: any): string => {
  const token: string = jwt.sign(payload, secretKey, CONFIG);
  return token;
};

export const verifyToken = (token: string, expectedUserId?: string) => {
  const decodedToken: any = jwt.verify(token, secretKey);

  if (expectedUserId && decodedToken.id !== expectedUserId) {
    throw new Error("Token inválido para este usuário.");
  }

  return decodedToken;
};

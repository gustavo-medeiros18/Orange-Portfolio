import { Request, Response } from "express";
import { LoginService } from "../services/login.service";
import { comparePasswords } from "../utils/bcryptUtils";
import { generateToken } from "../utils/jwtAuth";
import { UserService } from "../services/user.service";
import { client } from "../config/oauth.config";
import dotenv from "dotenv";

dotenv.config();

export class LoginController {
  public static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await LoginService.authenticateLogin(email);

      if (user) {
        const isAValidPassword = await comparePasswords(password, user.password);
        if (isAValidPassword) {
          const { password,isGoogleLogin,createdAt,updatedAt, ...dtoUser } = user;
          const token = generateToken(dtoUser);
          return res.status(200).json({ message: "Login bem-sucedido.", dtoUser, token });
        }
      }

      return res.status(401).json({ message: "Credenciais inválidas." });
    } catch (error) {
      console.error("Erro na rota /login:", error);
      res.status(500).json({ message: "Erro inesperado eu realizar login." });
    }
  }

  public static async googleLogin(req: Request, res: Response) {
    let tokenGoogle = req.body.token;
    try {
      if (!tokenGoogle) {
        throw new Error("Credencial ausente ou inválida.");
      }

      // busca as informações do usuário
      const ticket = await client.verifyIdToken({
        idToken: tokenGoogle,
        audience: process.env.CLIENT_ID,
      });

      // formata as informações do usuário através do ticket
      const payload: any = ticket.getPayload();

      let user = await LoginService.authenticateLogin(payload.email);
      let userInfo;
      if (user) {
        // usuario ja cadastrado no banco
        userInfo = {
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          country: user.country,
          iconUrl: user.iconUrl,
        };
        let token = generateToken(userInfo);
        res.status(200).json({ message: "Login bem-sucedido.", token, userInfo });
      } else {
        // usuario ainda nao foi cadastrado
        user = {
          name: payload.given_name,
          lastName: payload.family_name,
          email: payload.email,
          isGoogleLogin: true,
          password: Math.random().toString(36).slice(-10), //gera senha aleatória (não é usada na autenticação com o google)
          country: "",
          iconUrl: payload.picture ?? ""
        };
        user = await UserService.createUser(user);
        userInfo = {
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          country: user.country,
          iconUrl: user.iconUrl,
        };
        let token = generateToken(userInfo);
        res.status(200).json({ message: "Login bem-sucedido.", token, userInfo });
      }
    } catch (error) {
      res.status(500).send("Erro ao autenticar com o Google");
    }
  }
}

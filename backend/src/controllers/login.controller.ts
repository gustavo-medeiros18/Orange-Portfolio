import { Request, Response } from "express";
import LoginService from "../services/login.service";
import { comparePasswords } from "../utils/bcryptUtils";
import { generateToken } from "../utils/jwtAuth";
import { OAuth2Client } from "google-auth-library";
import UserService from "../services/user.service";
import { v4 as uuidv4 } from "uuid";

const client = new OAuth2Client({
  clientId: "102685364306-m0ssdqq50ier1aqn5eulgr4eto0qidev.apps.googleusercontent.com",
  clientSecret: "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",
  redirectUri: "http://localhost:3000/auth/google",
});

class LoginController {
  public static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await LoginService.authenticateLogin(email);

      if (user) {
        const isAValidPassword = await comparePasswords(password, user.password);

        if (isAValidPassword) {
          const { password, ...dtoUser } = user;
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
        audience: "102685364306-m0ssdqq50ier1aqn5eulgr4eto0qidev.apps.googleusercontent.com",
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
          password: Math.random().toString(36).slice(-10), //gera senha aleatória (não é usada na autenticação com o google)
          country: "",
          iconUrl: "",
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
export default LoginController;

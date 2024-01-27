import { Request, Response } from "express";
import LoginService from "../services/login.service";
import { comparePasswords } from "../utils/bcryptUtils";
import { generateToken } from "../utils/jwtAuth";

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
}

export default LoginController;

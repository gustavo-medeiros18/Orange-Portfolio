import { Request, Response } from "express";

class LoginController {
  public static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await LoginService.authenticateLogin(email, password);

      if (user) {
        res.json({ message: "Login bem-sucedido.", user });
      } else {
        res.status(401).json({ message: "Credenciais inválidas." });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default LoginController;

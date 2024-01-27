import { User } from "../models/user.model";
import UserService from "../services/user.service";
import { hashPassword } from "../utils/bcryptUtils";
import { Request, Response } from "express";

class UserController {
  public static async getAllUsers(_req: Request, res: Response) {
    const user = await UserService.getAllUsers();

    if (!user) {
      return res.status(500);
    }
    return res.status(200).json(user);
  }

  public static async getUserById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const user = await UserService.getUserById(id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }

  public static async createUser(req: Request, res: Response) {
    const newUser: User = req.body;

    newUser.password = await hashPassword(newUser.password);

    const createdUser = await UserService.createUser(newUser);

    if (!newUser || !newUser.name || !newUser.email) {
      return res
        .status(400)
        .json({ message: "Solicitação inválida. Verifique os parâmetros enviados." });
    }
    return res.status(201).json(createdUser);
  }

  public static async deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);

    const result = await UserService.deleteUserById(userId);

    if (result) {
      return res.status(204).json({ message: "Usuário deletado com sucesso." });
    } else {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
  }
}

export default UserController;

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
      const { password, ...dtoUser } = user;
      res.json(dtoUser);
    } else {
      res.status(404).json({ message: "Usuário não encontrado." });
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
    const { password, ...dtoUser } = newUser;

    return res.status(201).json(dtoUser);
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

  public static async updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    const updatedUserData: User = req.body;

    try {
      updatedUserData.password = await hashPassword(updatedUserData.password);

      const updatedUser = await UserService.updateUser(userId, updatedUserData);

      if (!updatedUser) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return res.status(500).json({ message: "Erro interno ao atualizar usuário." });
    }
  }
}

export default UserController;

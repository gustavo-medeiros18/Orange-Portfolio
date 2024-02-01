import { User } from "../models/user.model";
import UserService from "../services/user.service";
import { comparePasswords, hashPassword } from "../utils/bcryptUtils";
import { Request, Response } from "express";
import { uploadFile } from "../utils/fileUploadUtils";

class UserController {
  public static async getAllUsers(_req: Request, res: Response) {
    const users = await UserService.getAllUsers();

    if (!users) {
      return res.status(500);
    }
    const usersWithoutPasswords = users.map(({ password, ...dtoUser }) => dtoUser);

    return res.status(200).json(usersWithoutPasswords);
  }

  public static async getUserById(req: Request, res: Response) {
    const id = req.params.id;
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

    try {
      newUser.password = await hashPassword(newUser.password);

      const createdUser = await UserService.createUser(newUser);

      const { password, ...dtoUser } = createdUser;

      return res.status(201).json(dtoUser);
    } catch (error: any) {
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "Este e-mail já está em uso." });
      } else {
        console.error("Erro ao criar usuário:", error);
        return res.status(500).json({ message: "Erro interno ao criar usuário." });
      }
    }
  }

  public static async deleteUser(req: Request, res: Response) {
    const userId = req.params.id;

    const result = await UserService.deleteUserById(userId);

    if (result) {
      return res.status(204).json({ message: "Usuário deletado com sucesso." });
    } else {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
  }

  public static async updateUser(req: Request, res: Response) {
    const userId = req.params.id;
    const updatedUserData: User = req.body;

    try {
      if (req.file) {
        const downloadURL = await uploadFile(req.file!);
        updatedUserData.iconUrl = downloadURL;
      }

      const updatedUser = await UserService.updateUser(userId, updatedUserData);

      if (!updatedUser) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
      const { password, ...dtoUser } = updatedUser;
      return res.status(200).json(dtoUser);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return res.status(500).json({ message: "Erro interno ao atualizar usuário." });
    }
  }

  public static async updatePassword(req: Request, res: Response) {
    const userId = req.params.id;

    const { oldPassword, newPassword } = req.body;

    try {
      const existingUser = await UserService.getUserById(userId);

      if (!existingUser) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      const isPasswordValid = await comparePasswords(oldPassword, existingUser.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Senha antiga incorreta." });
      }

      if (oldPassword === newPassword) {
        return res
          .status(401)
          .json({ message: "A nova senha deve ser diferente da senha antiga." });
      }

      const updatedPassword = await hashPassword(newPassword);

      await UserService.updatePassword(userId, updatedPassword);

      return res.status(200).json({ message: "Senha atualizada com sucesso." });
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      return res.status(500).json({ message: "Erro interno ao atualizar senha." });
    }
  }
}

export default UserController;

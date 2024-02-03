import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { comparePasswords, hashPassword } from "../utils/bcryptUtils";
import { Request, Response } from "express";
import { uploadFile } from "../utils/fileUploadUtils";
import { UserPassword } from "../models/userPassword.model";
import { verifyToken } from "../utils/jwtAuth";

export class UserController {
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
    const token = req.headers.authorization;

    try {
      verifyToken(token as string, id);

      const user = await UserService.getUserById(id);

      if (user) {
        const { password, ...dtoUser } = user;
        res.json(dtoUser);
      } else {
        res.status(404).json({ message: "Usuário não encontrado." });
      }
    } catch (error: any) {
      if (error.message === "Token inválido para este usuário.") {
        return res.status(403).json({ message: "Usuário não autorizado." });
      }
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
      const token = req.headers.authorization;

      verifyToken(token as string, userId);

      const currentUser = await UserService.getUserById(userId);
      if (!currentUser) return res.status(404).json({ message: "Usuário não encontrado." });

      if (updatedUserData.password) {
        updatedUserData.password = await hashPassword(updatedUserData.password);
      }

      if (req.files) {
        let downloadUrl;
        if ("iconUrl" in req.files) {
          downloadUrl = await uploadFile(req.files["iconUrl"][0]);
          updatedUserData.iconUrl = downloadUrl;
        }
      }

      if (!updatedUserData.iconUrl) updatedUserData.iconUrl = currentUser.iconUrl;
      if (!updatedUserData.country) updatedUserData.country = currentUser.country;

      const updatedUser = await UserService.updateUser(userId, updatedUserData);
      if (!updatedUser) {
        return res.status(500).json({ message: "Não foi possível atualizar o usuário." });
      }
      const { password, ...dtoUser } = updatedUser;
      return res.status(200).json(dtoUser);
    } catch (error: any) {
      console.error("Erro ao atualizar usuário:", error);

      if (error.message === "Token inválido para este usuário.")
        return res.status(403).json({ message: "Usuário não autorizado." });
      else return res.status(500).json({ message: "Erro interno ao atualizar senha do usuário." });
    }
  }

  public static async updatePassword(req: Request, res: Response) {
    const userId = req.params.id;
    const updatedUserData: UserPassword = req.body;

    const providedPassword = updatedUserData.currentPassword;
    const providedNewPassword = updatedUserData.newPassword;

    try {
      const token = req.headers.authorization;

      verifyToken(token as string, userId);

      if (providedPassword) {
        // verifica se a senha inserida é a mesma do banco
        const realCurrentPasswordCrypt = await UserService.getUserPasswordById(userId);
        if (!realCurrentPasswordCrypt) {
          return res.status(404).json({ message: "Usuário não encontrado." });
        }
        const isProvidedPasswordCorrect = await comparePasswords(
          providedPassword,
          realCurrentPasswordCrypt
        );
        if (!isProvidedPasswordCorrect)
          return res.status(400).json({ message: "A senha fornecida está incorreta" });

        // atualiza com a nova senha criptografada
        const providedNewPasswordCrypt = await hashPassword(providedNewPassword);

        const isPasswordUpdated = await UserService.updateUserPassword(
          userId,
          providedNewPasswordCrypt
        );

        if (!isPasswordUpdated) {
          return res.status(400).json({ message: "A nova senha informada é inválida" });
        }
        return res.status(200).json();
      }
    } catch (error: any) {
      console.error("Erro ao atualizar usuário:", error);

      if (error.message === "Token inválido para este usuário.")
        return res.status(403).json({ message: "Usuário não autorizado." });
      else return res.status(500).json({ message: "Erro interno ao atualizar senha do usuário." });
    }
  }

  public static async isGoogleLogin(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      const isGoogleLogin = await UserService.isGoogleLogin(userId);
      return res.status(200).json(isGoogleLogin);
    } catch (error: any) {
      return res
        .status(500)
        .json({ messsage: "Erro interno ao verificar tipo de login do usuário" });
    }
  }
}

import { RowDataPacket } from "mysql2";
import { User } from "../models/user.model";
import { connection } from "../database/config";

export class LoginService {
  public static async authenticateLogin(email: string) {
    try {
      const sqlStatement = "SELECT * FROM users WHERE email = ?";
      const [rows] = await connection.query<RowDataPacket[]>(sqlStatement, [email]);

      if (rows.length > 0) {
        return rows[0] as User;
      }

      return null;
    } catch (error) {
      console.error("Erro ao autenticar usuário:");
      throw error;
    }
  }
}

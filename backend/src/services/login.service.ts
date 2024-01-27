import { RowDataPacket } from "mysql2";
import { User } from "../models/user.model";
import connection from "../database/config";
import { comparePasswords } from "../utils/bcryptUtils";

class LoginService {
  public static async authenticateLogin(email: string, password: string) {
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      console.log(rows);

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

export default LoginService;

import { RowDataPacket } from "mysql2";
import { User } from "../models/user.model";
import connection from "../database/config";

class LoginService {
  public static async authenticateLogin(email: string) {
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

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

import connection from "../database/config";
import { RowDataPacket } from "mysql2";
import { User } from "../models/user.model";

class UserService {
  public static async getAllUsers(): Promise<User[]> {
    const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM users");
    return rows as User[];
  }
}

export default UserService;

import connection from "../database/config";
import { RowDataPacket } from "mysql2";
import { User } from "../models/user.model";

class UserService {
  public static async getAllUsers(): Promise<User[]> {
    const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM users");

    return rows as User[];
  }

  public static async getUserById(id: number): Promise<User | undefined> {
    const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM users WHERE id = ?", [
      id,
    ]);

    if (rows.length === 1) {
      return rows[0] as User;
    }

    return undefined;
  }

  public static async createUser(newUser: User): Promise<User> {
    const [result] = await connection.query("INSERT INTO users SET ?", [newUser]);
    const id = (result as any).insertId;
    return { ...newUser, id } as User;
  }
}

export default UserService;

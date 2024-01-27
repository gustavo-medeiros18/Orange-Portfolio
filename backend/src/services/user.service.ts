import connection from "../database/config";
import { ResultSetHeader, RowDataPacket } from "mysql2";
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

  public static async deleteUserById(userId: number): Promise<boolean> {
    const [result] = await connection.query<ResultSetHeader>("DELETE FROM users WHERE id = ?", [
      userId,
    ]);

    return result.affectedRows > 0;
  }

  public static async updateUser(id: number, updatedUser: User): Promise<User | undefined> {
    const [result] = await connection.query<ResultSetHeader>("UPDATE users SET ? WHERE id = ?", [
      updatedUser,
      id,
    ]);

    if (result.affectedRows === 1) {
      return { ...updatedUser, id } as User;
    }

    return undefined;
  }
}

export default UserService;

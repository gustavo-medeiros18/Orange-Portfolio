import connection from "../database/config";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { User } from "../models/user.model";
import { v4 as uuidv4 } from "uuid";

class UserService {
  public static async getAllUsers(): Promise<User[]> {
    const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM users");

    return rows as User[];
  }

  public static async getUserById(id: string): Promise<User | undefined> {
    const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM users WHERE id = ?", [
      id,
    ]);

    if (rows.length === 1) {
      return rows[0] as User;
    }

    return undefined;
  }

  public static async createUser(newUser: User): Promise<User> {
    const id = uuidv4();
    newUser.id = id;
    const [result] = await connection.query("INSERT INTO users SET ?", [newUser]);
    return { ...newUser, id } as User;
  }

  public static async deleteUserById(userId: string): Promise<boolean> {
    const [result] = await connection.query<ResultSetHeader>("DELETE FROM users WHERE id = ?", [
      userId,
    ]);

    return result.affectedRows > 0;
  }

  public static async updateUser(id: string, updatedUser: User): Promise<User | undefined> {
    const [result] = await connection.query<ResultSetHeader>("UPDATE users SET ? WHERE id = ?", [
      updatedUser,
      id,
    ]);

    if (result.affectedRows === 1) {
      return { ...updatedUser, id } as User;
    }

    return undefined;
  }

  public static async updatePassword(userId: string, newPassword: string) {
    await connection.query<ResultSetHeader>("UPDATE users SET password = ? WHERE id = ?", [
      newPassword,
      userId,
    ]);
  }
}

export default UserService;

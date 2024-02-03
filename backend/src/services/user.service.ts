import { connection } from "../database/config";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { User } from "../models/user.model";
import { v4 as uuidv4 } from "uuid";

export class UserService {
  public static async getAllUsers(): Promise<User[]> {
    const sqlStatement = "SELECT * FROM users";
    const [rows] = await connection.query<RowDataPacket[]>(sqlStatement);

    return rows as User[];
  }

  public static async getUserById(id: string): Promise<User | undefined> {
    const sqlStatement = "SELECT * FROM users WHERE id = ?";
    const [rows] = await connection.query<RowDataPacket[]>(sqlStatement, id);

    if (rows.length === 1) {
      return rows[0] as User;
    }

    return undefined;
  }

  public static async getUserPasswordById(id: string): Promise<string> {
    const sqlStatement = "SELECT password FROM users WHERE id = ?";
    const [rows] = await connection.query<RowDataPacket[]>(sqlStatement, id);
    return (rows[0] as { password: string }).password;
  }

  public static async createUser(newUser: User): Promise<User> {
    const id = uuidv4();
    newUser.id = id;

    const sqlStatement = "INSERT INTO users SET ?";
    const [result] = await connection.query(sqlStatement, newUser);

    return { ...newUser, id } as User;
  }

  public static async deleteUserById(userId: string): Promise<boolean> {
    const sqlStatement = "DELETE FROM users WHERE id = ?";
    const [result] = await connection.query<ResultSetHeader>(sqlStatement, userId);

    return result.affectedRows > 0;
  }

  public static async updateUser(id: string, updatedUser: User): Promise<User | undefined> {
    const sqlStatement = "UPDATE users SET ? WHERE id = ?";
    const [result] = await connection.query<ResultSetHeader>(sqlStatement, [updatedUser, id]);

    if (result.affectedRows === 1) {
      return { ...updatedUser, id } as User;
    }

    return undefined;
  }

  public static async updateUserPassword(id: string, newPassword: string): Promise<boolean> {
    const sqlStatement = "UPDATE users SET password = ? WHERE id = ?";
    const [result] = await connection.query<ResultSetHeader>(sqlStatement, [newPassword, id]);
    return result.affectedRows === 1;
  }

  // 1 -> google 0 -> register
  public static async isGoogleLogin(id: string): Promise<boolean> {
    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT isGoogleLogin FROM users WHERE id = ?",
      [id]
    );
    return Boolean(rows[0].isGoogleLogin);
  }
}

import connection from "../database/config";
import { Project } from "../models/project.model";
import { RowDataPacket } from "mysql2";

class ProjectService {
  public static async getAllProjects(): Promise<Project[]> {
    const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM projects");

    return rows as Project[];
  }

  public static async getAllProjectsByUserId(userId: number): Promise<Project[]> {
    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM projects WHERE id_user = ?",
      [userId]
    );

    return rows as Project[];
  }
}

export default ProjectService;

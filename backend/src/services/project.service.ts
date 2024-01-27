import connection from "../database/config";
import { Project } from "../models/project.model";
import { RowDataPacket } from "mysql2";

class ProjectService {
  public static async createProject(newProject: Project): Promise<any> {
    const sqlStatement = "INSERT INTO projects SET ?";

    const [result] = await connection.query(sqlStatement, [newProject]);
    const id = (result as any).insertId;

    return { ...newProject, id };
  }

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

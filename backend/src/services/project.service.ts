import connection from "../database/config";
import { Project } from "../models/project.model";
import { ResultSetHeader, RowDataPacket } from "mysql2";

class ProjectService {
  public static async createProject(newProject: Project): Promise<any> {
    const sqlStatement = "INSERT INTO projects SET ?";

    const [result] = await connection.query(sqlStatement, [newProject]);
    const id = (result as any).insertId;

    return { ...newProject, id };
  }

  public static async getAllProjects(): Promise<Project[]> {
    const sqlStatement =
      "SELECT p.id, p.title, p.tags, p.link, p.description, p.img_url, u.name " +
      "AS first_name, u.last_name AS last_name FROM projects p " +
      "INNER JOIN " +
      "users u ON p.id_user = u.id";

    const [rows] = await connection.query<RowDataPacket[]>(sqlStatement);

    return rows as Project[];
  }

  public static async getAllProjectsByUserId(userId: number): Promise<Project[]> {
    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM projects WHERE id_user = ?",
      [userId]
    );

    return rows as Project[];
  }

  public static async deleteProjectById(projectId: number): Promise<boolean> {
    const [result] = await connection.query<ResultSetHeader>("DELETE FROM projects WHERE id = ?", [projectId]);

    return result.affectedRows > 0;
  }
}

export default ProjectService;

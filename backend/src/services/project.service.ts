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
      "SELECT " +
      "p.id, p.title, p.tags, p.link, p.description, p.imgUrl, p.createdAt, u.name " +
      "AS firstName, u.lastName " +
      "FROM projects p " +
      "INNER JOIN " +
      "users u ON p.idUser = u.id";

    const [rows] = await connection.query<RowDataPacket[]>(sqlStatement);

    return rows as Project[];
  }

  public static async getAllProjectsByUserId(userId: number): Promise<Project[]> {
    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM projects WHERE idUser = ?",
      [userId]
    );

    return rows as Project[];
  }

  public static async getProjectById(projectId: number): Promise<Project | undefined> {
    const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM projects WHERE id = ?", [
      projectId,
    ]);

    if (rows.length === 1) {
      return rows[0] as Project;
    }

    return undefined;
  }

  public static async updateProject(
    id: number,
    updatedProject: Project
  ): Promise<Project | undefined> {
    const sqlStatement = "UPDATE projects SET ? WHERE id = ?";

    const [result] = await connection.query<ResultSetHeader>(sqlStatement, [updatedProject, id]);

    if (result.affectedRows === 1) {
      return { ...updatedProject, id } as Project;
    }

    return undefined;
  }

  public static async deleteProjectById(projectId: number): Promise<boolean> {
    const [result] = await connection.query<ResultSetHeader>("DELETE FROM projects WHERE id = ?", [
      projectId,
    ]);

    return result.affectedRows > 0;
  }
}

export default ProjectService;

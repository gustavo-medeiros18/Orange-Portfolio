import { connection } from "../database/config";
import { Project } from "../models/project.model";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { v4 as uuidv4 } from "uuid";

export class ProjectService {
  public static async createProject(newProject: Project): Promise<any> {
    const id = uuidv4();
    newProject.id = id;

    const sqlStatement = "INSERT INTO projects SET ?";
    await connection.query(sqlStatement, newProject);

    return { ...newProject, id };
  }

  public static async getAllProjects(): Promise<Project[]> {
    const sqlStatement =
      "SELECT " +
      "p.id, p.title, p.tags, p.link, p.description, p.imgUrl, p.createdAt, " +
      "u.name AS userName, u.lastName, u.iconUrl " +
      "FROM projects p " +
      "INNER JOIN " +
      "users u ON p.idUser = u.id";

    const [rows] = await connection.query<RowDataPacket[]>(sqlStatement);

    rows.forEach((row) => {
      row.tags = row.tags.split(", ");
    });

    return rows as Project[];
  }

  public static async getAllProjectsByUserId(userId: string): Promise<Project[]> {
    const sqlStatement =
      "SELECT " +
      "p.id, p.title, p.tags, p.link, p.description, p.imgUrl, p.createdAt, " +
      "u.name AS userName, u.lastName, u.iconUrl " +
      "FROM projects p " +
      "INNER JOIN " +
      "users u ON p.idUser = u.id " +
      "WHERE u.id = ?";

    const [rows] = await connection.query<RowDataPacket[]>(sqlStatement, userId);

    rows.forEach((row) => {
      row.tags = row.tags.split(", ");
    });

    return rows as Project[];
  }

  public static async getProjectById(projectId: string): Promise<Project | undefined> {
    const sqlStatement = "SELECT * FROM projects WHERE id = ?";

    const [rows] = await connection.query<RowDataPacket[]>(sqlStatement, projectId);

    if (rows.length === 1) return rows[0] as Project;

    return undefined;
  }

  public static async updateProject(
    id: string,
    updatedProject: Project
  ): Promise<Project | undefined> {
    const sqlStatement = "UPDATE projects SET ? WHERE id = ?";

    const [result] = await connection.query<ResultSetHeader>(sqlStatement, [updatedProject, id]);

    if (result.affectedRows === 1) return { ...updatedProject, id } as Project;

    return undefined;
  }

  public static async deleteProjectById(projectId: string): Promise<boolean> {
    const sqlStatement = "DELETE FROM projects WHERE id = ?";

    const [result] = await connection.query<ResultSetHeader>(sqlStatement, projectId);

    return result.affectedRows > 0;
  }
}

import ProjectService from "../services/project.service";
import { Request, Response } from "express";

class ProjectController {
  public static async createProject(req: Request, res: Response) {
    const project = req.body;
    const projectId = await ProjectService.createProject(project);

    if (!projectId) return res.status(500);

    return res.status(201).json({ projectId });
  }

  public static async getAllProjects(_req: Request, res: Response) {
    const projects = await ProjectService.getAllProjects();

    if (!projects) return res.status(500);

    return res.status(200).json(projects);
  }

  public static async getAllProjectsByUserId(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);
    const projects = await ProjectService.getAllProjectsByUserId(userId);

    if (projects.length == 0)
      return res.status(404).json({ message: "Esse usuário não tem projetos" });

    return res.status(200).json(projects);
  }
}

export default ProjectController;

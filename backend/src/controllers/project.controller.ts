import ProjectService from "../services/project.service";
import { Request, Response } from "express";
import multer from "multer";

class ProjectController {
  public static async createProject(req: Request, res: Response) {
    console.log(req.file);

    res.send("ok");
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

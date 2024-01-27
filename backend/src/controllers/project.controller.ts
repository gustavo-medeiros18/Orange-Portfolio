import ProjectService from "../services/project.service";
import { Request, Response } from "express";
import { Project } from "../models/project.model";
import { uploadFile } from "../utils/fileUploadUtils";

class ProjectController {
  public static async createProject(req: Request, res: Response) {
    const newProject: Project = req.body;

    if (
      !newProject ||
      !newProject.title ||
      !newProject.description ||
      !newProject.tags ||
      !newProject.link ||
      !req.file
    ) {
      return res
        .status(422)
        .json({ message: "Solicitação inválida. Verifique os parâmetros enviados." });
    }

    const downloadURL = await uploadFile(req.file!);
    newProject.img_url = downloadURL;

    const createdProject = await ProjectService.createProject(newProject);

    return res.status(201).json(createdProject);
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

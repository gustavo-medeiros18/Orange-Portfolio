import ProjectService from "../services/project.service";
import { Request, Response } from "express";
import { Project } from "../models/project.model";
import { uploadFile } from "../utils/fileUploadUtils";
import UserService from "../services/user.service";

class ProjectController {
  public static async createProject(req: Request, res: Response) {
    const newProject: Project = req.body;

    const userExists = await UserService.getUserById(newProject.id_user);
    if (!userExists)
      return res.status(404).json({ message: "Solicitação inválida. Usuário não encontrado." });

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

    const downloadURL = await uploadFile(req.file);
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

  public static async updateProject(req: Request, res: Response) {
    const projectId = parseInt(req.params.id);
    const updatedProject: Project = req.body;

    const userExists = await UserService.getUserById(updatedProject.id_user);
    const projectExists = await ProjectService.getProjectById(projectId);

    if (
      !updatedProject ||
      !updatedProject.title ||
      !updatedProject.description ||
      !updatedProject.tags ||
      !updatedProject.link ||
      !req.file ||
      !userExists ||
      !projectExists
    ) {
      return res
        .status(422)
        .json({ message: "Solicitação inválida. Verifique os parâmetros enviados." });
    }

    const downloadURL = await uploadFile(req.file!);
    updatedProject.img_url = downloadURL;

    const updated = await ProjectService.updateProject(projectId, updatedProject);

    if (!updated) {
      return res.status(404).json({ message: "Projeto não encontrado." });
    }

    return res.status(200).json(updated);
  }

  public static async deleteProject(req: Request, res: Response) {
    const projectId = parseInt(req.params.id);

    const result = await ProjectService.deleteProjectById(projectId);

    if (result) {
      return res.status(204).json({ message: "Projeto deletado com sucesso." });
    } else {
      return res.status(404).json({ message: "Projeto não encontrado." });
    }
  }
}

export default ProjectController;

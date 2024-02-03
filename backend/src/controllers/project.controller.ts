import { ProjectService } from "../services/project.service";
import { Request, Response } from "express";
import { Project } from "../models/project.model";
import { uploadFile } from "../utils/fileUploadUtils";
import { UserService } from "../services/user.service";

export class ProjectController {
  public static async createProject(req: Request, res: Response) {
    const newProject: Project = req.body;
    if (
      !newProject ||
      !newProject.title ||
      !newProject.description ||
      !newProject.tags ||
      !newProject.link ||
      !newProject.idUser
    ) {
      return res
        .status(422)
        .json({ message: "Solicitação inválida. Verifique os parâmetros enviados." });
    }

    const userExists = await UserService.getUserById(newProject.idUser);
    if (!userExists)
      return res.status(404).json({ message: "Solicitação inválida. Usuário não encontrado." });

    if (req.files && "imgUrl" in req.files) {
      let downloadUrl = await uploadFile(req.files["imgUrl"][0]);
      newProject.imgUrl = downloadUrl ? downloadUrl : "";
    }
    const createdProject = await ProjectService.createProject(newProject);
    return res.status(201).json(createdProject);
  }

  public static async getAllProjects(req: Request, res: Response) {
    const projects = await ProjectService.getAllProjects();

    if (!projects) return res.status(500);
    return res.status(200).json(projects);
  }

  public static async getAllProjectsByUserId(req: Request, res: Response) {
    const userId = req.params.userId;
    const projects = await ProjectService.getAllProjectsByUserId(userId);

    if (projects.length == 0)
      return res.status(404).json({ message: "Esse usuário não tem projetos" });
    return res.status(200).json(projects);
  }

  public static async updateProject(req: Request, res: Response) {
    const projectId = req.params.id;
    const updatedProject: Project = req.body;

    const userExists = await UserService.getUserById(updatedProject.idUser);
    const projectExists = await ProjectService.getProjectById(projectId);

    if (!userExists)
      return res.status(404).json({ message: "Solicitação inválida. Usuário não encontrado." });
    if (!projectExists)
      return res.status(404).json({ message: "Solicitação inválida. Projeto não encontrado." });

    if (
      !updatedProject ||
      !updatedProject.title ||
      !updatedProject.description ||
      !updatedProject.tags ||
      !updatedProject.link
    ) {
      return res
        .status(422)
        .json({ message: "Solicitação inválida. Verifique os parâmetros enviados." });
    }
    
    if (req.files) {
      let downloadUrl;
      if ("imgUrl" in req.files) {
        downloadUrl = await uploadFile(req.files["imgUrl"][0]);
        updatedProject.imgUrl = downloadUrl;
      }
    }
    const updated = await ProjectService.updateProject(projectId, updatedProject);

    return res.status(200).json(updated);
  }

  public static async deleteProject(req: Request, res: Response) {
    const projectId = req.params.id;
    const result = await ProjectService.deleteProjectById(projectId);

    if (result) {
      return res.status(204).json({ message: "Projeto deletado com sucesso." });
    } else {
      return res.status(404).json({ message: "Projeto não encontrado." });
    }
  }
}

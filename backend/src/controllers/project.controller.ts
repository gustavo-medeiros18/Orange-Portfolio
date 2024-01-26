import ProjectService from "../services/project.service";
import { Request, Response } from "express";
import multer from "multer";

class ProjectController {
  public static async createProject(req: Request, res: Response) {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./uploads");
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      },
    });

    const upload = multer({ storage: storage });

    upload.single("image_file")(req, res, function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const project = req.body;

      console.log(project);

      // const projectId = await ProjectService.createProject(project);

      // if (!projectId) return res.status(500);

      return res.status(201).json({ message: "Projeto criado com sucesso" });
    });
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

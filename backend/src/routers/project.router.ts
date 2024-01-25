import { Router } from "express";
import ProjectController from "../controllers/project.controller";

const projectRouter = Router();

projectRouter.get("/projects", ProjectController.getAllProjects);

export default projectRouter;
import { Router } from "express";
import ProjectController from "../controllers/project.controller";

const projectRouter = Router();

projectRouter.get("/projects", ProjectController.getAllProjects);
projectRouter.get("/projects/user/:userId", ProjectController.getAllProjectsByUserId);
projectRouter.post("/projects", ProjectController.createProject);

export default projectRouter;
import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";
import { authenticateMiddleware } from "../middlewares/authMiddleware";

const projectRouter = Router();

projectRouter.use(authenticateMiddleware);

projectRouter.get("/projects", ProjectController.getAllProjects);
projectRouter.get("/projects/user/:userId", ProjectController.getAllProjectsByUserId);
projectRouter.post("/projects", ProjectController.createProject);
projectRouter.put("/projects/:id", ProjectController.updateProject);
projectRouter.delete("/projects/:id", ProjectController.deleteProject);

export { projectRouter };

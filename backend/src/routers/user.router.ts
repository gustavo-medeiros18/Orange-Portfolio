import UserController from "../controllers/user.controller";
import { Router } from "express";
import { authenticateMiddleware } from "../middlewares/authMiddleware";

const userRouter = Router();
userRouter.post("/users", UserController.createUser);

// rotas com autenticação
userRouter.use(authenticateMiddleware);
userRouter.get("/users", UserController.getAllUsers);
userRouter.get("/users/:id", UserController.getUserById);
userRouter.delete("/users/:id", UserController.deleteUser);
userRouter.put("/users/:id", UserController.updateUser);
userRouter.put("/users/updatePassword/:id",UserController.updatePassword);

export { userRouter };

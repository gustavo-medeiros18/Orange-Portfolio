import { UserController } from "../controllers/user.controller";
import { Router } from "express";
import { authenticateMiddleware } from "../middlewares/authMiddleware";

const userRouter = Router();
userRouter.post("/users", UserController.createUser);

// Daqui pra baixo, as rotas estão protegidas
userRouter.use(authenticateMiddleware);

userRouter.get("/users", UserController.getAllUsers);
userRouter.get("/users/:id", UserController.getUserById);
userRouter.delete("/users/:id", UserController.deleteUser);
userRouter.put("/users/:id", UserController.updateUser);
userRouter.put("/users/:id/password", UserController.updatePassword);
userRouter.get("/users/:id/google", UserController.isGoogleLogin);

export { userRouter };

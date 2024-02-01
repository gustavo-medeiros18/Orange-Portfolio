import UserController from "../controllers/user.controller";
import { Router } from "express";
import { authenticateMiddleware } from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.post("/users", UserController.createUser);

userRouter.get("/users", UserController.getAllUsers);
userRouter.get("/users/:id", authenticateMiddleware, UserController.getUserById);
userRouter.delete("/users/:id", authenticateMiddleware, UserController.deleteUser);
userRouter.patch("/users/:id", authenticateMiddleware, UserController.updateUser);
userRouter.patch("/password/:id", authenticateMiddleware, UserController.updatePassword);

export default userRouter;

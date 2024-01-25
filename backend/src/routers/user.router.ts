import UserController from "../controllers/user.controller";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/users", UserController.getAllUsers);
userRouter.get("/users/:id", UserController.getUserById);

export default userRouter;

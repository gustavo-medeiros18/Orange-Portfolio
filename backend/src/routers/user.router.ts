import UserController from "../controllers/user.controller";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/", UserController.getAllUsers);
userRouter.get("/:id", UserController.getUserById);

export default userRouter;

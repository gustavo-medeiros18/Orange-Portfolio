import UserController from "../controllers/user.controller";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/users", UserController.getAllUsers);

export default userRouter;

import UserController from "../controllers/user.controller";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/users", UserController.getAllUsers);
userRouter.get("/users/:id", UserController.getUserById);
userRouter.post("/users", UserController.createUser);
userRouter.delete("/users/:id", UserController.deleteUser);
userRouter.put("/users/:id", UserController.updateUser);

export default userRouter;

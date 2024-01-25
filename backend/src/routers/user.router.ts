import { Router } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router();


userRouter.get('/users', userController.findAll)

userRouter.post('/login', userController.login)

export default userRouter;
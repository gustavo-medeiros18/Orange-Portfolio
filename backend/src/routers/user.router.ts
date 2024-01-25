import UserController from '../controllers/user.controller';
import { Router } from "express";


const userRouter = Router();


userRouter.get('/', UserController.getAllUsers);



export default userRouter;
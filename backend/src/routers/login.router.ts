import { Router } from "express";
import { LoginController } from "../controllers/login.controller";

const loginRouter = Router();

loginRouter.post("/login", LoginController.loginUser);
loginRouter.post("/auth/google", LoginController.googleLogin);

export { loginRouter };

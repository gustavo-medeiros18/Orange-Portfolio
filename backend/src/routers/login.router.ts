import { Router } from "express";

const loginRouter = Router();

loginRouter.post("/login", LoginController.loginUser);

export default loginRouter;

import express from "express";
import dotenv from "dotenv";
import userRouter from "./routers/user.router";
import projectRouter from "./routers/project.router";
import { multerMiddleware } from "./middlewares/fileParser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(multerMiddleware);

app.listen(3000, () => console.log(`Express rodando na porta ${process.env.PORT}`));

app.use(userRouter);
app.use(projectRouter);

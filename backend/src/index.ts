import express from "express";
import dotenv from "dotenv";
import userRouter from "./routers/user.router";
import projectRouter from "./routers/project.router";
import { multerMiddleware } from "./middlewares/uploader";

dotenv.config();

const app = express();

app.use(express.json());
app.use(multerMiddleware);

app.listen(process.env.PORT, () => console.log(`Express rodando na porta ${process.env.PORT}`));

app.use(userRouter);
app.use(projectRouter);

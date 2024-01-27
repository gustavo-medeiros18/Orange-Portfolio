import express from "express";
import userRouter from "./routers/user.router";
import projectRouter from "./routers/project.router";
import { imageUploader } from "./middlewares/uploader";

const app = express();

app.use(express.json());
app.use(imageUploader);

app.listen(3000, () => console.log(`express rodando na porta ${3000}`));

app.use(userRouter);
app.use(projectRouter);

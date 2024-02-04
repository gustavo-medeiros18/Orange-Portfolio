import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Importe o pacote cors
import { userRouter } from "./routers/user.router";
import { projectRouter } from "./routers/project.router";
import { multerMiddleware } from "./middlewares/fileParser";
import { loginRouter } from "./routers/login.router";

dotenv.config();

const app = express();

app.use(cors()); // Use o middleware cors
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => console.log(`Express rodando na porta ${process.env.PORT}`));
app.get("/ping", (_req, res) => {
  res.status(200).json({ message: "A API está online" });
});

app.use(multerMiddleware);

app.use(loginRouter);
app.use(userRouter);
app.use(projectRouter);

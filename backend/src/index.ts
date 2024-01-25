import express, { Request, Response } from 'express';
import { connection } from './database/connection';
const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Dockerized Node.js App!');
});

app.listen(port, () => {
  connection.connect((err) => {
    if (err) {
      console.error(`Erro ao conectar no banco: ${err}`);
      return;
    }
    console.log("Conectado no banco com sucesso!");
  })

  console.log(`rodando na porta ${port}`);
});



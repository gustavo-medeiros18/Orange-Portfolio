import express, { Request, Response } from 'express';
const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Dockerized Node.js App!');
});

app.listen(port, () => {
  console.log(`rodando na porta ${port}`);
});



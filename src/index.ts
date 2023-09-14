import express, { Request, Response } from 'express';
import router from './routes';

const app: express.Application = express();
const port: number = 3000;

app.use(router);

app.listen(port, () => {
  console.log(`server URL: http://localhost:${port}`);
});

app.use((_req: Request, res: Response) => {
  res.status(404).send('Route not found');
});

export default app;

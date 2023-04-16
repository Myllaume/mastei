import express, { Express, Request, Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const port = 8000;

app.use(express.static(path.join(__dirname, '../views/')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../views/dev.html'));
});

app.get('/api', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      app: {
        name: 'Masteï',
        version: '0.1.0',
      },
    })
  );
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

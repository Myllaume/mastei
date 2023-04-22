import express, { Express, Request, Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { appInformations } from '../types';
import { AppConfig, makeConfigDir, AppConfigParams } from './appConfig';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const port = 8000;

app.use(express.static(path.join(__dirname, '../views/')));

async function bootApp(): Promise<AppConfigParams> {
  const canLoadConfig = await AppConfig.isLoadable();
  if (canLoadConfig === false) {
    await makeConfigDir();
    const configToSave = new AppConfig({ libraries: [] });
    await configToSave.save();
  }
  const config = await AppConfig.load();
  return config;
}

bootApp().then((appConfig) => {
  app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../views/dev.html'));
  });

  app.get('/api/libraries', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(appConfig.libraries));
  });

  app.get('/api/appconfig', (req: Request, res: Response) => {
    const result = {
      app: {
        name: 'Masteï',
        version: '0.1.0',
      } as appInformations,
    };

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  });

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});

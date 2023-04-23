import express, { Express } from 'express';
import bodyParser from 'body-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { AppConfig, makeConfigDir, AppConfigParams } from './appConfig';
import { appInformations } from './routes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();

const port = 8000;

app.use(express.static(path.join(__dirname, '../views/')));
app.use(bodyParser.json());

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

app.use('/appInformations', appInformations);

bootApp().then((appConfig) => {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});

import express, { Express } from 'express';
import bodyParser from 'body-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { AppConfig, makeConfigDir } from './appConfig';
import { appInformations } from './routes/appInformations';
import { libraries } from './routes/libraries';
import { makeDataDir, makeLibrariesDir } from './library';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();

const port = 8000;

app.use(express.static(path.join(__dirname, '../views/')));
app.use(bodyParser.json());

async function bootApp(): Promise<void> {
  await Promise.all([makeDataDir(), makeLibrariesDir()]);
  const canLoadConfig = await AppConfig.isLoadable();

  if (canLoadConfig === true) {
    return;
  }

  switch (canLoadConfig.code) {
    case 'config-file-not-exist':
      await makeConfigDir();
    case 'config-file-contains-invalid-value':
      // overwrite broken config file
      const configToSave = new AppConfig(AppConfig.base);
      await configToSave.save();
  }
}

bootApp().then((appConfig) => {
  app.use('/appInformations', appInformations);
  app.use('/libraries', libraries);

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});

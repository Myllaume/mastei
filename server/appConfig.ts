import { writeFile, readFile, existsSync, mkdir } from 'node:fs';
import path from 'node:path';
import { library } from '../types';
import envPaths from 'env-paths';
import { WriteConfigFileError, ReadConfigFileError, MakeConfigDirError } from '../errors';

const { config: configDirPath } = envPaths('mastei', { suffix: '' });

export interface AppConfigParams {
  libraries: library[];
}

export class AppConfig {
  libraries: library[];

  constructor({ libraries }: AppConfigParams) {
    this.libraries = libraries;
  }

  public static savePath = path.join(configDirPath, 'config.json');

  public save(): Promise<void> {
    return new Promise((resolve, reject) => {
      writeFile(
        AppConfig.savePath,
        JSON.stringify({ libraries: this.libraries }),
        'utf-8',
        (err) => {
          if (err) {
            reject(new WriteConfigFileError(AppConfig.savePath, err));
          }
          resolve();
        }
      );
    });
  }

  public static load(): Promise<AppConfigParams> {
    return new Promise((resolve, reject) => {
      readFile(AppConfig.savePath, 'utf-8', (err, data) => {
        if (err) {
          reject(new ReadConfigFileError(AppConfig.savePath, err));
        }
        resolve(JSON.parse(data));
      });
    });
  }

  public static async isLoadable(): Promise<boolean> {
    if (existsSync(AppConfig.savePath) === false) {
      return false;
    }

    const config = await AppConfig.load();

    if (Array.isArray(config.libraries) === false) {
      return false;
    }

    return true;
  }
}

export function makeConfigDir(): Promise<void> {
  if (existsSync(configDirPath)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    mkdir(configDirPath, (err) => {
      if (err) {
        reject(new MakeConfigDirError(configDirPath, err));
      }
      resolve();
    });
  });
}

import { writeFile, readFile, existsSync, mkdir } from 'node:fs';
import path from 'node:path';
import { library } from '../types';
import envPaths from 'env-paths';
import {
  WriteConfigFileError,
  ReadConfigFileError,
  MakeConfigDirError,
  ConfigFileNotExistError,
  ConfigFileContainsInvalidValueError,
} from '../errors';
import { Library } from './library';

const { config: configDirPath } = envPaths('mastei', { suffix: '' });

export interface AppConfigParams {
  libraries: library[];
}

export class AppConfig {
  libraries: Library[];

  public static base = Object.freeze({
    libraries: [],
  } as AppConfigParams);

  constructor({ libraries }: AppConfigParams) {
    this.libraries = libraries.map((lib) => new Library(lib));
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

  public static load(): Promise<AppConfig> {
    return new Promise((resolve, reject) => {
      readFile(AppConfig.savePath, 'utf-8', (err, data) => {
        if (err) {
          reject(new ReadConfigFileError(AppConfig.savePath, err));
        }
        const params = JSON.parse(data) as AppConfigParams;
        resolve(new AppConfig(params));
      });
    });
  }

  public static async isLoadable(): Promise<
    ConfigFileNotExistError | ReadConfigFileError | ConfigFileContainsInvalidValueError | true
  > {
    if (existsSync(AppConfig.savePath) === false) {
      return Promise.resolve(new ConfigFileNotExistError());
    }

    return new Promise((resolve) => {
      readFile(AppConfig.savePath, 'utf-8', (err, data) => {
        if (err) {
          resolve(new ReadConfigFileError(AppConfig.savePath, err));
        }
        const params = JSON.parse(data) as AppConfigParams;

        if (Array.isArray(params.libraries) === false) {
          resolve(new ConfigFileContainsInvalidValueError('libraries'));
        }

        resolve(true);
      });
    });
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

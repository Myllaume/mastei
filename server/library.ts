import { existsSync, mkdir, readFile } from 'node:fs';
import path from 'node:path';
import { library } from '../types';
import {
  LibraryDirectoryNotExistError,
  MakeDataDirError,
  MakeLibrariesDirError,
  MakeLibraryDirError,
  LibraryDirAlreadyExistError,
} from '../errors';
import { uuidv4 } from '../misc';
import envPaths from 'env-paths';
import { AppConfig } from './appConfig';

const { data: dataDirPath } = envPaths('mastei', { suffix: '' });

export class Library implements library {
  id: string;
  title: string;
  directory: string;
  lastEditDate: number;
  canOpen?: boolean;

  public static savePath = path.join(dataDirPath, 'libraries');

  constructor({ id, title, directory, lastEditDate }: library) {
    this.id = id;
    this.title = title;
    this.directory = directory;
    this.lastEditDate = lastEditDate;
  }

  public async checkIsLoadable(): Promise<LibraryDirectoryNotExistError | true> {
    if (existsSync(this.directory) === false) {
      return Promise.resolve(new LibraryDirectoryNotExistError(this.directory));
    }
    return Promise.resolve(true);
  }

  /**
   * @todo Slugify title as id to direcotry
   * @todo Slugified title become the library id
   * @todo Check if library id is already used: error if doublons
   * @todo Save library to app config
   */

  public static async add(title: string): Promise<library[]> {
    const libraryPath = path.join(Library.savePath, title);

    const library = new Library({
      id: uuidv4(),
      title,
      directory: libraryPath,
      lastEditDate: Number(Date.now()),
      canOpen: true,
    });

    if (existsSync(libraryPath)) {
      return Promise.reject(new LibraryDirAlreadyExistError(libraryPath));
    }

    return new Promise((resolve, reject) => {
      mkdir(library.directory, async (err) => {
        if (err) {
          reject(new MakeLibraryDirError(library.directory, err));
        }

        const config = await AppConfig.load();
        config.libraries.push(library);
        await config.save();

        resolve(config.libraries);
      });
    });
  }
}

export function makeDataDir(): Promise<void> {
  if (existsSync(dataDirPath)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    mkdir(dataDirPath, (err) => {
      if (err) {
        reject(new MakeDataDirError(dataDirPath, err));
      }
      resolve();
    });
  });
}

export function makeLibrariesDir(): Promise<void> {
  if (existsSync(Library.savePath)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    mkdir(Library.savePath, (err) => {
      if (err) {
        reject(new MakeLibrariesDirError(Library.savePath, err));
      }
      resolve();
    });
  });
}

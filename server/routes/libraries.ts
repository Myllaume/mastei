import express, { Request, Response } from 'express';
import { AppConfig } from '../appConfig';
import { InvalidRequestKeyError } from '../../errors';
import { Library } from '../library';

const libraries = express.Router();

libraries.get('/', (req: Request, res: Response) => {
  AppConfig.load().then((config) => {
    res.json(config.libraries);
  });
});

libraries.post('/add', (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string') {
    throw new InvalidRequestKeyError('add', 'library', 'title');
  }

  Library.add(title).then((library) => {
    res.json(library);
  });
});

export { libraries };

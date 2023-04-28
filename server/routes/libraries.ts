import express, { Request, Response } from 'express';
import { AppConfig } from '../appConfig';
import { InvalidRequestKeyError } from '../../errors';
import { Library } from '../library';
import slugify from 'slugify';
import { CustomError } from '../../types';

const libraries = express.Router();

libraries.get('/', (req: Request, res: Response) => {
  AppConfig.load().then((config) => {
    res.json(config.libraries);
  });
});

libraries.post('/add', (req: Request, res: Response) => {
  let { title } = req.body;

  title = slugify(title, {
    remove: /[\[\]*+~.()'"!:@]/g,
    replacement: '-',
    lower: true,
    strict: true,
    trim: true,
  });

  if (!title || typeof title !== 'string') {
    throw new InvalidRequestKeyError('add', 'library', 'title');
  }

  Library.add(title)
    .then((library) => {
      res.json(library);
    })
    .catch((err: CustomError) => {
      res.status(400).json({
        code: err.code,
        message: err.message,
      });
    });
});

export { libraries };

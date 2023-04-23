import express, { Request, Response } from 'express';
import { AppInformations } from '../../types';

const appInformations = express.Router();

appInformations.get('/', (req: Request, res: Response) => {
  res.json({
    version: '0.1.0',
  } as AppInformations);
});

export { appInformations };

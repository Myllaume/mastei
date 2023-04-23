import express, { Request, Response } from 'express';

const appInformations = express.Router();

appInformations.get('/version', (req: Request, res: Response) => {
  res.json({
    version: '0.1.0',
  });
});

export { appInformations };

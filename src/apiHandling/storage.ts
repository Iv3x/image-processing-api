import { existsSync } from 'fs';
import express from 'express';
import * as paths from '../paths';

class Storage {
  storeFile(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const { filename, width, height } = req.query;
    const w: number = Number(width);
    const h: number = Number(height);
    const imageName: string = (filename as string) + `_${w}_${h}.jpg`;
    const storagePath: string = paths.storage + '/' + imageName;
    if (!existsSync(storagePath)) {
      next();
    } else {
      res.status(304).sendFile(storagePath);
    }
  }
}

const storage = new Storage();
export default storage;

import { existsSync, mkdirSync } from 'fs';
import * as paths from '../paths';
import resize from '../utils/sharp';
import express from 'express';

class ImageUtils {
  async resizeImage(req: express.Request): Promise<string> {
    const { filename, width, height } = req.query;
    const w: number = Number(width);
    const h: number = Number(height);
    const image: string = (filename as string) + '.jpg';
    const newImage: string = (filename as string) + `_${w}_${h}.jpg`;
    const imagePath: string = paths.images + '/' + image;
    const storagePath: string = paths.storage;
    if (!existsSync(storagePath)) {
      mkdirSync(storagePath);
    }
    const newImagePath: string = paths.storage + '/' + newImage;

    await resize(imagePath, w, h, newImagePath);
    return newImagePath;
  }
}

const imageUtils = new ImageUtils();
export default imageUtils;

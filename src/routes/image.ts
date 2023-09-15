import express, { Router } from 'express';
import imageUtils from '../imageHandling/imageUtils';
import storage from '../apiHandling/storage';

const image = Router();

image.get('/image', storage.storeFile, async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const newImage: string = await imageUtils.resizeImage(req);
    res.status(200).sendFile(newImage);
  } catch (e) {
    res.status(500).send('failed to process the image');
  }
});

export default image;

import supertest from 'supertest';
import app from '../index';
import * as paths from '../paths';
import { existsSync, unlinkSync } from 'fs';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('check image route', (): void => {
  it('should get the failed to process image message', async (): Promise<void> => {
    const response = await request.get('/image');
    expect(response.status).toEqual(500);
    expect(response.text).toEqual('failed to process the image');
  });

  it('should create a new image', async (): Promise<void> => {
    const storagePath: string = paths.storage + '/fjord_100_100.jpg';
    if (existsSync(storagePath)) {
      unlinkSync(storagePath);
    }
    const response = await request.get('/image?filename=fjord&width=100&height=100');
    expect(response.status).toEqual(200);
  });

  it('should return the image from the storage', async (): Promise<void> => {
    const response = await request.get('/image?filename=fjord&width=100&height=100');
    expect(response.status).toEqual(304);
  });

  it('should get a route not found', async () => {
    const response = await request.get('/test');
    expect(response.status).toEqual(404);
    expect(response.text).toEqual('Route not found');
  });
});

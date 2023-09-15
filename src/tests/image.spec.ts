import resize from '../utils/sharp';
import * as paths from '../paths';

describe('check image processing', (): void => {
  it('should resize an image', async (): Promise<void> => {
    const imagePath: string = paths.images + '/fjord.jpg';
    const width: number = 100;
    const height: number = 100;
    const newImagePath: string = paths.storage + '/fjord_100_100.jpg';
    expect(async (): Promise<void> => {
      await resize(imagePath, width, height, newImagePath);
    }).not.toThrow(Error);
  });
});

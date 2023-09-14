import { existsSync, mkdirSync } from 'fs'
import { type Request } from 'express'
import * as paths from '../paths'
import resize from '../utils/sharp'

class ImageUtils {
  async resizeImage (req: Request): Promise<string> {
    const { filename, width, height } = req.query
    const w = Number(width)
    const h = Number(height)
    const image = (filename as string) + '.jpg'
    const newImage = (filename as string) + `_${w}_${h}.jpg`
    const imagePath = paths.images + '/' + image
    const storagePath = paths.storage
    if (!existsSync(storagePath)) {
      mkdirSync(storagePath)
    }
    const newImagePath: string = paths.storage + '/' + newImage

    await resize(imagePath, w, h, newImagePath)
    return newImagePath
  }
}

const imageUtils = new ImageUtils()
export default imageUtils

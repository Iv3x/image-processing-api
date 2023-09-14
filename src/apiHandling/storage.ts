import { existsSync } from 'fs'
import { type NextFunction, type Request, type Response } from 'express'
import * as paths from '../paths'

class Storage {
  storeFile (req: Request, res: Response, next: NextFunction): void {
    const { filename, width, height } = req.query
    const w = Number(width)
    const h = Number(height)
    const imageName = (filename as string) + `_${w}_${h}.jpg`
    const storagePath = paths.storage + '/' + imageName
    if (!existsSync(storagePath)) {
      next()
    } else {
      res.status(304).sendFile(storagePath)
    }
  }
}

const storage = new Storage()
export default storage

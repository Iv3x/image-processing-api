import { Router } from 'express';
import image from './routes/image';
const router = Router();

router.use('/', image);

export default router;

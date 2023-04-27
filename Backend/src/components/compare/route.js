import { Router } from 'express';
import compareController from '.';

const router = Router();

router.get('/', compareController.getCarsDetail);
export default router;

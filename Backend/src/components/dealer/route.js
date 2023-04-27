import { Router } from 'express';
import { DealerController } from './index';
// import User from '../models/user';

const router = Router();

router.get('', DealerController.getDealers);

export default router;

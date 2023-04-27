import { Router } from 'express';
import { AdvancerSeachController } from './index';

const router = Router();

router.get('/', AdvancerSeachController.getAllCars);

export default router;

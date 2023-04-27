import { Router } from 'express';
import { ValuationController } from './index';
// import User from '../models/user';

const router = Router();

router.post('/', ValuationController.getCarValuation);
/* router.get(
  '/details',
  CarController.getDetail
); */

// Register a new user

export default router;

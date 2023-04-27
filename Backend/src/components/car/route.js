import { Router } from 'express';
import { CarController } from './index';
// import User from '../models/user';

const router = Router();

router.get('/', CarController.getAllCars);
router.get('/series', CarController.getSeries);
router.get('/analytics', CarController.getAnalyticalData);
// Register a new user

export default router;

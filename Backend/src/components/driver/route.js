import { Router } from 'express';
import { DriverController } from './index';
// import User from '../models/user';

const router = Router();

router.get('/', DriverController.getAllDrivers);
router.get('/details', DriverController.getDetail);

// Register a new user

export default router;

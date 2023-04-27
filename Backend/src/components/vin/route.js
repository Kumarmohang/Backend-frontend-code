import { Router } from 'express';
import { VinController } from './index';
// import User from '../models/user';

const router = Router();

router.get('', VinController.getVinDetails);

// Register a new user

export default router;

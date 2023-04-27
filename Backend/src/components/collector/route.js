import { Router } from 'express';
import { CollectorController } from '.';

const router = Router();

router.get('', CollectorController.getCollectors);
router.get('/details', CollectorController.getDetails);
export default router;

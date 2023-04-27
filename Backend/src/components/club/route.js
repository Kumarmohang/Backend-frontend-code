import { Router } from 'express';
import { ClubController } from './index';
// import User from '../models/user';

const router = Router();

router.get(
  '',
  /*  
  #swagger.paths={
    get:
    "/clubs"
  }
#swagger.responses[200] = {
description: 'Clubs Result',
} 

#swagger.responses[500] = {
description: '', 
schema:{
"success": false,
"msg": "internal server error"
}
} 
*/
  ClubController.clubs
);
router.get('/details', ClubController.getDetail);

// Register a new user

export default router;

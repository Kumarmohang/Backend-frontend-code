import { Router } from 'express';
import { CircuitController } from './index';
// import User from '../models/user';

const router = Router();

router.get(
  '/',
  /*  
  #swagger.paths={
    get:
    "/circuits"
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
  CircuitController.circuits
);
router.get(
  '/details',
  /*  
  #swagger.paths={
    get:
    "/circuits/details"
  }
  #swagger.parameters[0] = {
  name: 'id',
  in: 'query',
  description: 'Circuit ID',
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
  CircuitController.getDetail
);

// Register a new user

export default router;

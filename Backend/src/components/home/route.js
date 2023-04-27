import { Router } from 'express';
import { HomeController } from './index';
// import User from '../models/user';

const router = Router();

router.get('/details', HomeController.getDetails);
router.get('/get-asset-class', HomeController.getAssetCount);
router.get('/cars/sort_key', HomeController.getSortingKeys);
router.get(
  '/search',
  /* 
  #swagger.parameters={
    "in": "query",
    "name": "search",
  }
   */
  HomeController.search
);
router.get('/list/:type', HomeController.getList);

// Register a new user

export default router;

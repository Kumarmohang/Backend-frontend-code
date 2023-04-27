import { Router } from 'express';
import { SuggestionController } from './index';
// import User from '../models/user';

const router = Router();

router.get('/', SuggestionController.getAllSuggestion);
router.post('/', SuggestionController.createNewSuggestion);
router.put('/', SuggestionController.updateExistingSuggestion);

export default router;

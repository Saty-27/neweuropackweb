import express from 'express';
import * as industryController from '../controllers/industryController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public Routes
router.get('/', industryController.getIndustries);
router.get('/:slug', industryController.getIndustryBySlug);

// Admin Protected Routes
router.post('/', protect, industryController.createIndustry);
router.patch('/:id', protect, industryController.updateIndustry);
router.delete('/:id', protect, industryController.deleteIndustry);

export default router;

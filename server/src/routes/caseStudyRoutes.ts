import express from 'express';
import {
  getCaseStudies,
  getCaseStudyBySlug,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
  getSettings,
  updateSettings,
  getAvailableProducts
} from '../controllers/caseStudyController';

const router = express.Router();

// Public Routes
router.get('/', getCaseStudies);
router.get('/artifact/:slug', getCaseStudyBySlug); // Use artifact prefix to avoid conflict with settings
router.get('/settings', getSettings);
router.get('/products/available', getAvailableProducts);

// Admin / Management Routes
router.post('/', createCaseStudy);
router.patch('/:id', updateCaseStudy);
router.delete('/:id', deleteCaseStudy);
router.patch('/settings/update', updateSettings);

export default router;

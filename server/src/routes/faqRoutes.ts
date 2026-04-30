import { Router } from 'express';
import { 
  getFAQs, 
  createFAQ, 
  updateFAQ, 
  deleteFAQ, 
  getPageSettings, 
  updatePageSettings,
  getPublicFAQs 
} from '../controllers/faqController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

// Public
router.get('/public/:page', getPublicFAQs);

// Admin (CRUD FAQs)
router.get('/', protect, authorize('Super Admin', 'Admin'), getFAQs as any);
router.post('/', protect, authorize('Super Admin', 'Admin'), createFAQ as any);
router.put('/:id', protect, authorize('Super Admin', 'Admin'), updateFAQ as any);
router.delete('/:id', protect, authorize('Super Admin', 'Admin'), deleteFAQ as any);

// Page Settings (which pages show FAQs)
router.get('/settings/:page', protect, authorize('Super Admin', 'Admin'), getPageSettings as any);
router.put('/settings/:page', protect, authorize('Super Admin', 'Admin'), updatePageSettings as any);

export default router;

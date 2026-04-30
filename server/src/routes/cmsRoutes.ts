import { Router } from 'express';
import { getPageContent, getAllPages, savePageContent } from '../controllers/cmsController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

// Public readonly route
router.get('/:slug', getPageContent as any);

// Admin routes
router.get('/', protect, authorize('Super Admin', 'Admin'), getAllPages as any);
router.post('/', protect, authorize('Super Admin', 'Admin'), savePageContent as any);

export default router;

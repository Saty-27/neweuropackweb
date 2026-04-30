import { Router } from 'express';
import { createQuote, getQuotes, updateQuoteStatus } from '../controllers/quoteController';
import { protect, authorize } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

// Public route to submit a quote
router.post('/', upload.single('file'), createQuote as any);

// Protected routes for Admin CRM
router.get('/', protect, authorize('Super Admin', 'Admin', 'Editor'), getQuotes as any);
router.put('/:id/status', protect, authorize('Super Admin', 'Admin', 'Editor'), updateQuoteStatus as any);

export default router;

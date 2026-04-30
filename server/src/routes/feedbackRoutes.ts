import express from 'express';
import { 
  submitFeedback, 
  getAllFeedback, 
  getApprovedFeedback, 
  updateFeedbackStatus, 
  deleteFeedback 
} from '../controllers/feedbackController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/', submitFeedback);
router.get('/approved', getApprovedFeedback);

// Protected Admin routes
router.get('/', protect, authorize('Super Admin', 'Admin'), getAllFeedback);
router.put('/:id', protect, authorize('Super Admin', 'Admin'), updateFeedbackStatus);
router.delete('/:id', protect, authorize('Super Admin', 'Admin'), deleteFeedback);

export default router;

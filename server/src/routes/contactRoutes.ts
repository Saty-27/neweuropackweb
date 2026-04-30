import express from 'express';
import { 
  submitContactForm, 
  getAllSubmissions, 
  updateSubmissionStatus, 
  deleteSubmission 
} from '../controllers/contactController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Public route
router.post('/', submitContactForm);

// Protected Admin routes
router.get('/', protect, authorize('Super Admin', 'Admin'), getAllSubmissions);
router.put('/:id', protect, authorize('Super Admin', 'Admin'), updateSubmissionStatus);
router.delete('/:id', protect, authorize('Super Admin', 'Admin'), deleteSubmission);

export default router;

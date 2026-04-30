import express from 'express';
import * as enquiryController from '../controllers/enquiryController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public Submission
router.post('/', enquiryController.createEnquiry);

// Admin Protected CRM
router.get('/', protect, enquiryController.getEnquiries);
router.patch('/:id/status', protect, enquiryController.updateEnquiryStatus);
router.delete('/:id', protect, enquiryController.deleteEnquiry);

export default router;

import express from 'express';
import * as jobController from '../controllers/jobController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public Routes
router.get('/', jobController.getAllJobs);
router.get('/settings', jobController.getJobSettings);

// Protected Routes (Admin only)
router.post('/', protect, jobController.createJob);
router.get('/:id', protect, jobController.getJobById);
router.put('/:id', protect, jobController.updateJob);
router.delete('/:id', protect, jobController.deleteJob);
router.put('/settings/update', protect, jobController.updateJobSettings);

export default router;

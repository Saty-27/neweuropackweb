import express from 'express';
import * as teamController from '../controllers/teamController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public Routes
router.get('/', teamController.getMembers);
router.get('/settings', teamController.getSettings);

// Admin Protected Routes
router.post('/', protect, teamController.addMember);
router.patch('/reorder', protect, teamController.reorderMembers);
router.patch('/settings', protect, teamController.updateSettings);
router.patch('/:id', protect, teamController.updateMember);
router.delete('/:id', protect, teamController.deleteMember);

export default router;

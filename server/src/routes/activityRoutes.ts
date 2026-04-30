import { Router } from 'express';
import * as activityController from '../controllers/activityController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

// Administrative Activity Hub
router.get('/', protect, authorize('Super Admin', 'Admin'), activityController.getActivityLogs as any);
router.get('/stats', protect, authorize('Super Admin'), activityController.getActiveUserStats as any);

export default router;

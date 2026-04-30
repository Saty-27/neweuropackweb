import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboardController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/stats', protect, authorize('Super Admin', 'Admin', 'Editor'), getDashboardStats as any);

export default router;

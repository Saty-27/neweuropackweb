import express from 'express';
import { logVisit, getStats } from '../controllers/analyticsController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.post('/log', logVisit);
router.get('/stats', protect, admin, getStats);

export default router;

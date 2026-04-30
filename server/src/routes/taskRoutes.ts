import { Router } from 'express';
import { getTasks, createTask, updateTaskStatus } from '../controllers/taskController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.route('/')
  .get(protect, getTasks as any)
  .post(protect, authorize('Super Admin', 'Admin'), createTask as any);

router.route('/:id/status')
  .put(protect, updateTaskStatus as any);

export default router;

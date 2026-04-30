import { Router } from 'express';
import * as userController from '../controllers/userController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

// Administrative User Hub
router.get('/', protect, authorize('Super Admin', 'Admin'), userController.getUsers as any);
router.post('/create', protect, authorize('Super Admin'), userController.createUser as any);
router.patch('/:id/update', protect, authorize('Super Admin'), userController.updateUser as any);
router.delete('/:id/remove', protect, authorize('Super Admin'), userController.deleteUser as any);
router.patch('/:id/toggle-status', protect, authorize('Super Admin'), userController.toggleUserStatus as any);

export default router;

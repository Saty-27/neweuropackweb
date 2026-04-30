import express from 'express';
import * as serviceController from '../controllers/serviceController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public Routes
router.get('/', serviceController.getServicePages);
router.get('/:slug', serviceController.getServiceBySlug);

// Admin Protected Routes
router.post('/', protect, serviceController.createServicePage);
router.patch('/:id', protect, serviceController.updateServicePage);
router.delete('/:id', protect, serviceController.deleteServicePage);

export default router;

import express from 'express';
import * as galleryController from '../controllers/galleryController';
import { protect } from '../middleware/auth';

const router = express.Router();

// --- Public Routes ---
router.get('/items', galleryController.getGalleryItems);
router.get('/settings', galleryController.getGallerySettings);

// --- Admin Protected Routes ---
router.post('/items', protect, galleryController.createGalleryItem);
router.patch('/items/:id', protect, galleryController.updateGalleryItem);
router.delete('/items/:id', protect, galleryController.deleteGalleryItem);

router.patch('/settings', protect, galleryController.updateGallerySettings);

export default router;

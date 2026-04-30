import express from 'express';
import * as mediaController from '../controllers/mediaController';
import { protect } from '../middleware/auth';

const router = express.Router();

// --- Public Routes ---
router.get('/items', mediaController.getMediaItems);
router.get('/settings', mediaController.getMediaSettings);

// --- Admin Protected Routes ---
router.post('/items', protect, mediaController.createMediaItem);
router.patch('/items/:id', protect, mediaController.updateMediaItem);
router.delete('/items/:id', protect, mediaController.deleteMediaItem);

router.patch('/settings', protect, mediaController.updateMediaSettings);

export default router;

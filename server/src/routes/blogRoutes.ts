import express from 'express';
import * as blogController from '../controllers/blogController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public Routes
router.get('/', blogController.getAllBlogs);
router.get('/recommended', blogController.getRecommendedBlogs);
router.get('/:slug', blogController.getBlogBySlug);

// Protected Routes (Admin only)
router.post('/', protect, blogController.createBlog);
router.put('/:id', protect, blogController.updateBlog);
router.delete('/:id', protect, blogController.deleteBlog);

export default router;

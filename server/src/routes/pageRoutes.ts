import express from 'express';
import { 
  getPages, 
  getPageBySlug, 
  getPageById, 
  createPage, 
  updatePage, 
  deletePage 
} from '../controllers/pageController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Public
router.get('/slug/:slug', getPageBySlug);

// Admin
router.use(protect);
router.use(authorize('Super Admin', 'Admin'));

router.get('/', getPages);
router.get('/:id', getPageById);
router.post('/', createPage);
router.put('/:id', updatePage);
router.delete('/:id', deletePage);

export default router;

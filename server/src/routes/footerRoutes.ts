import express from 'express';
import { getFooter, updateFooter } from '../controllers/footerController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', getFooter);
router.put('/', protect, authorize('Super Admin', 'Admin'), updateFooter);

export default router;

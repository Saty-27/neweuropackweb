import { Router } from 'express';
import { 
  getHomepageData, 
  updateHomepageData, 
  updateBanners, 
  updateCompanies, 
  updateWelcomeSection,
  updateGlobalSection
} from '../controllers/homepageController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

// Public Read
router.get('/', getHomepageData as any);

// Admin Modify
router.put('/', protect, authorize('Super Admin', 'Admin'), updateHomepageData as any);
router.put('/banners', protect, authorize('Super Admin', 'Admin'), updateBanners as any);
router.put('/companies', protect, authorize('Super Admin', 'Admin'), updateCompanies as any);
router.put('/welcome', protect, authorize('Super Admin', 'Admin'), updateWelcomeSection as any);
router.put('/global-section', protect, authorize('Super Admin', 'Admin'), updateGlobalSection as any);

export default router;

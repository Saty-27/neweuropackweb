import express from 'express';
import { getSiteSettings, updateSiteSettings, serveVerificationFile } from '../controllers/siteSettingsController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', getSiteSettings);
router.put('/', protect, authorize('Super Admin', 'Admin'), updateSiteSettings);

// Public route to dynamically serve files like google12345.html
router.get('/file/:filename', serveVerificationFile);

export default router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homepageController_1 = require("../controllers/homepageController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public Read
router.get('/', homepageController_1.getHomepageData);
// Admin Modify
router.put('/', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), homepageController_1.updateHomepageData);
router.put('/banners', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), homepageController_1.updateBanners);
router.put('/companies', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), homepageController_1.updateCompanies);
router.put('/welcome', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), homepageController_1.updateWelcomeSection);
router.put('/global-section', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), homepageController_1.updateGlobalSection);
exports.default = router;

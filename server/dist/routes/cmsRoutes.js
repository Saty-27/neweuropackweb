"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cmsController_1 = require("../controllers/cmsController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public readonly route
router.get('/:slug', cmsController_1.getPageContent);
// Admin routes
router.get('/', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), cmsController_1.getAllPages);
router.post('/', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), cmsController_1.savePageContent);
exports.default = router;

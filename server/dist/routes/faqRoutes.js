"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const faqController_1 = require("../controllers/faqController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public
router.get('/public/:page', faqController_1.getPublicFAQs);
// Admin (CRUD FAQs)
router.get('/', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), faqController_1.getFAQs);
router.post('/', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), faqController_1.createFAQ);
router.put('/:id', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), faqController_1.updateFAQ);
router.delete('/:id', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), faqController_1.deleteFAQ);
// Page Settings (which pages show FAQs)
router.get('/settings/:page', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), faqController_1.getPageSettings);
router.put('/settings/:page', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), faqController_1.updatePageSettings);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quoteController_1 = require("../controllers/quoteController");
const auth_1 = require("../middleware/auth");
const upload_1 = require("../middleware/upload");
const router = (0, express_1.Router)();
// Public route to submit a quote
router.post('/', upload_1.upload.single('file'), quoteController_1.createQuote);
// Protected routes for Admin CRM
router.get('/', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin', 'Editor'), quoteController_1.getQuotes);
router.put('/:id/status', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin', 'Editor'), quoteController_1.updateQuoteStatus);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboardController_1 = require("../controllers/dashboardController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/stats', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin', 'Editor'), dashboardController_1.getDashboardStats);
exports.default = router;

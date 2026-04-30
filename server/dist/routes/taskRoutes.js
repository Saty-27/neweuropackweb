"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.route('/')
    .get(auth_1.protect, taskController_1.getTasks)
    .post(auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), taskController_1.createTask);
router.route('/:id/status')
    .put(auth_1.protect, taskController_1.updateTaskStatus);
exports.default = router;

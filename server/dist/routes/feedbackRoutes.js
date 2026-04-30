"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feedbackController_1 = require("../controllers/feedbackController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Public routes
router.post('/', feedbackController_1.submitFeedback);
router.get('/approved', feedbackController_1.getApprovedFeedback);
// Protected Admin routes
router.get('/', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), feedbackController_1.getAllFeedback);
router.put('/:id', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), feedbackController_1.updateFeedbackStatus);
router.delete('/:id', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), feedbackController_1.deleteFeedback);
exports.default = router;

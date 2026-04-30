"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_1 = require("../controllers/contactController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Public route
router.post('/', contactController_1.submitContactForm);
// Protected Admin routes
router.get('/', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), contactController_1.getAllSubmissions);
router.put('/:id', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), contactController_1.updateSubmissionStatus);
router.delete('/:id', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), contactController_1.deleteSubmission);
exports.default = router;

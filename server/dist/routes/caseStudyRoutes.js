"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const caseStudyController_1 = require("../controllers/caseStudyController");
const router = express_1.default.Router();
// Public Routes
router.get('/', caseStudyController_1.getCaseStudies);
router.get('/artifact/:slug', caseStudyController_1.getCaseStudyBySlug); // Use artifact prefix to avoid conflict with settings
router.get('/settings', caseStudyController_1.getSettings);
router.get('/products/available', caseStudyController_1.getAvailableProducts);
// Admin / Management Routes
router.post('/', caseStudyController_1.createCaseStudy);
router.patch('/:id', caseStudyController_1.updateCaseStudy);
router.delete('/:id', caseStudyController_1.deleteCaseStudy);
router.patch('/settings/update', caseStudyController_1.updateSettings);
exports.default = router;

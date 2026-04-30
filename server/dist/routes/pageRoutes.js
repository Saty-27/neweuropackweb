"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pageController_1 = require("../controllers/pageController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Public
router.get('/slug/:slug', pageController_1.getPageBySlug);
// Admin
router.use(auth_1.protect);
router.use((0, auth_1.authorize)('Super Admin', 'Admin'));
router.get('/', pageController_1.getPages);
router.get('/:id', pageController_1.getPageById);
router.post('/', pageController_1.createPage);
router.put('/:id', pageController_1.updatePage);
router.delete('/:id', pageController_1.deletePage);
exports.default = router;

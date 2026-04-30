"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const footerController_1 = require("../controllers/footerController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', footerController_1.getFooter);
router.put('/', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), footerController_1.updateFooter);
exports.default = router;

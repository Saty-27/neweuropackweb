"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const auth_1 = require("../middleware/auth");
const upload_1 = require("../middleware/upload");
const router = (0, express_1.Router)();
router.route('/')
    .get(productController_1.getProducts)
    .post(auth_1.protect, (0, auth_1.authorizePermission)('products', 'create'), upload_1.upload.array('images', 5), productController_1.createProduct);
// NEW: Standalone multi-upload route for Gallery Manager
router.post('/upload-multiple', auth_1.protect, (0, auth_1.authorizePermission)('products', 'edit'), upload_1.upload.array('images', 10), productController_1.uploadMultipleImages);
// NEW: AI Image Generation
router.post('/generate-ai-image', auth_1.protect, (0, auth_1.authorizePermission)('products', 'edit'), productController_1.generateAIImage);
// Public: get single product by slug or ID
router.get('/slug/:slug', productController_1.getProductBySlug);
router.route('/:id')
    .put(auth_1.protect, (0, auth_1.authorizePermission)('products', 'edit'), upload_1.upload.array('images', 5), productController_1.updateProduct)
    .delete(auth_1.protect, (0, auth_1.authorizePermission)('products', 'delete'), productController_1.deleteProduct);
exports.default = router;

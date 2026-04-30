"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAIImage = exports.uploadMultipleImages = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductBySlug = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const getProducts = async (req, res) => {
    try {
        const products = await Product_1.default.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json({ success: true, data: products });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getProducts = getProducts;
const getProductBySlug = async (req, res) => {
    try {
        const product = await Product_1.default.findOne({ slug: req.params.slug });
        if (!product)
            return res.status(404).json({ success: false, error: 'Product not found' });
        res.status(200).json({ success: true, data: product });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getProductBySlug = getProductBySlug;
const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        if (!productData.slug && productData.title) {
            productData.slug = productData.title
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
        }
        const product = await Product_1.default.create(productData);
        res.status(201).json({ success: true, data: product });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const productData = req.body;
        if (!productData.slug && productData.title) {
            productData.slug = productData.title
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
        }
        const product = await Product_1.default.findByIdAndUpdate(req.params.id, productData, { new: true, runValidators: true });
        if (!product)
            return res.status(404).json({ success: false, error: 'Product not found' });
        res.status(200).json({ success: true, data: product });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const product = await Product_1.default.findByIdAndDelete(req.params.id);
        if (!product)
            return res.status(404).json({ success: false, error: 'Product not found' });
        res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.deleteProduct = deleteProduct;
const uploadMultipleImages = async (req, res) => {
    try {
        if (!req.files || !Array.isArray(req.files)) {
            return res.status(400).json({ success: false, error: 'No files uploaded' });
        }
        const files = req.files;
        const uploadedPaths = files.map(file => {
            return file.path.replace(/\\/g, '/').replace(/^.*uploads\//, 'uploads/');
        });
        res.status(200).json({ success: true, data: uploadedPaths });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.uploadMultipleImages = uploadMultipleImages;
const generateAIImage = async (req, res) => {
    try {
        const { prompt, productName } = req.body;
        if (!prompt)
            return res.status(400).json({ success: false, error: 'Prompt is required' });
        console.log(`[AI] Generating image for: ${productName}`);
        // Mock response for now
        res.status(200).json({
            success: true,
            url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop', // Stock pallet image
            message: 'AI image generated (Demo Mode)'
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.generateAIImage = generateAIImage;

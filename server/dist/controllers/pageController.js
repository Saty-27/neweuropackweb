"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePage = exports.updatePage = exports.createPage = exports.getPageById = exports.getPageBySlug = exports.getPages = void 0;
const CustomPage_1 = __importDefault(require("../models/CustomPage"));
// Get all custom pages (Admin)
const getPages = async (req, res) => {
    try {
        const pages = await CustomPage_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: pages });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getPages = getPages;
// Get single page by slug (Public)
const getPageBySlug = async (req, res) => {
    try {
        const page = await CustomPage_1.default.findOne({ slug: req.params.slug, isPublished: true });
        if (!page) {
            return res.status(404).json({ success: false, error: 'Page not found' });
        }
        res.status(200).json({ success: true, data: page });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getPageBySlug = getPageBySlug;
// Get single page by ID (Admin)
const getPageById = async (req, res) => {
    try {
        const page = await CustomPage_1.default.findById(req.params.id);
        if (!page) {
            return res.status(404).json({ success: false, error: 'Page not found' });
        }
        res.status(200).json({ success: true, data: page });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getPageById = getPageById;
// Create page (Admin)
const createPage = async (req, res) => {
    try {
        const page = await CustomPage_1.default.create(req.body);
        res.status(201).json({ success: true, data: page });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.createPage = createPage;
// Update page (Admin)
const updatePage = async (req, res) => {
    try {
        const page = await CustomPage_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!page) {
            return res.status(404).json({ success: false, error: 'Page not found' });
        }
        res.status(200).json({ success: true, data: page });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.updatePage = updatePage;
// Delete page (Admin)
const deletePage = async (req, res) => {
    try {
        const page = await CustomPage_1.default.findByIdAndDelete(req.params.id);
        if (!page) {
            return res.status(404).json({ success: false, error: 'Page not found' });
        }
        res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.deletePage = deletePage;

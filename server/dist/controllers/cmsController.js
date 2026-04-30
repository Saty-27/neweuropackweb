"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePageContent = exports.getAllPages = exports.getPageContent = void 0;
const CMSPage_1 = __importDefault(require("../models/CMSPage"));
// Public endpoint to get standard page content by slug
const getPageContent = async (req, res) => {
    try {
        const { slug } = req.params;
        const page = await CMSPage_1.default.findOne({ slug });
        if (!page) {
            return res.status(404).json({ success: false, error: 'Page content not found' });
        }
        res.status(200).json({ success: true, data: page });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getPageContent = getPageContent;
// Admin endpoint to get all CMS pages
const getAllPages = async (req, res) => {
    try {
        const pages = await CMSPage_1.default.find();
        res.status(200).json({ success: true, data: pages });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getAllPages = getAllPages;
// Admin endpoint to update or create a page's content
const savePageContent = async (req, res) => {
    try {
        const { slug, title, content, type } = req.body;
        const page = await CMSPage_1.default.findOneAndUpdate({ slug }, { slug, title, content, type: type || 'page' }, { new: true, upsert: true, runValidators: true } // Creates if it doesn't exist
        );
        res.status(200).json({ success: true, data: page });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.savePageContent = savePageContent;

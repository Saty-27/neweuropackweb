"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicFAQs = exports.updatePageSettings = exports.getPageSettings = exports.getAllSettings = exports.deleteFAQ = exports.updateFAQ = exports.createFAQ = exports.getFAQs = void 0;
const FAQ_1 = __importDefault(require("../models/FAQ"));
const FAQSettings_1 = __importDefault(require("../models/FAQSettings"));
// --- FAQ CRUD ---
const getFAQs = async (req, res) => {
    try {
        const faqs = await FAQ_1.default.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json({ success: true, data: faqs });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getFAQs = getFAQs;
const createFAQ = async (req, res) => {
    try {
        const faq = await FAQ_1.default.create(req.body);
        res.status(201).json({ success: true, data: faq });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.createFAQ = createFAQ;
const updateFAQ = async (req, res) => {
    try {
        const faq = await FAQ_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!faq)
            return res.status(404).json({ success: false, error: 'FAQ not found' });
        res.status(200).json({ success: true, data: faq });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.updateFAQ = updateFAQ;
const deleteFAQ = async (req, res) => {
    try {
        const faq = await FAQ_1.default.findByIdAndDelete(req.params.id);
        if (!faq)
            return res.status(404).json({ success: false, error: 'FAQ not found' });
        res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.deleteFAQ = deleteFAQ;
// --- FAQ SETTINGS ---
const getAllSettings = async (req, res) => {
    try {
        const settings = await FAQSettings_1.default.find();
        res.status(200).json({ success: true, data: settings });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getAllSettings = getAllSettings;
const getPageSettings = async (req, res) => {
    try {
        const { page } = req.params;
        let settings = await FAQSettings_1.default.findOne({ page: page });
        if (!settings) {
            settings = await FAQSettings_1.default.create({ page: page });
        }
        res.status(200).json({ success: true, data: settings });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getPageSettings = getPageSettings;
const updatePageSettings = async (req, res) => {
    try {
        const { page } = req.params;
        const settings = await FAQSettings_1.default.findOneAndUpdate({ page: page }, req.body, { new: true, upsert: true, runValidators: true });
        res.status(200).json({ success: true, data: settings });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.updatePageSettings = updatePageSettings;
// --- PUBLIC FETCH ---
const getPublicFAQs = async (req, res) => {
    try {
        const { page } = req.params;
        const settings = await FAQSettings_1.default.findOne({ page: page }) || await FAQSettings_1.default.create({ page: page });
        const faqs = await FAQ_1.default.find({ pages: page, isActive: true }).sort({ order: 1 });
        res.status(200).json({
            success: true,
            data: {
                settings,
                faqs
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getPublicFAQs = getPublicFAQs;

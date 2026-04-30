"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableProducts = exports.updateSettings = exports.getSettings = exports.deleteCaseStudy = exports.updateCaseStudy = exports.createCaseStudy = exports.getCaseStudyBySlug = exports.getCaseStudies = void 0;
const CaseStudy_1 = __importDefault(require("../models/CaseStudy"));
const CaseStudySettings_1 = __importDefault(require("../models/CaseStudySettings"));
const Product_1 = __importDefault(require("../models/Product"));
const crypto_1 = __importDefault(require("crypto"));
const getCaseStudies = async (req, res) => {
    try {
        const isAdmin = req.query.admin === 'true';
        const filter = isAdmin ? {} : { visible: true };
        const items = await CaseStudy_1.default.find(filter)
            .sort({ order: 1, createdAt: -1 })
            .populate('productsUsed', 'core.title core.mainImage core.slug');
        res.json({ success: true, data: items });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getCaseStudies = getCaseStudies;
const getCaseStudyBySlug = async (req, res) => {
    try {
        const item = await CaseStudy_1.default.findOne({ slug: req.params.slug, visible: true })
            .populate('productsUsed', 'core.title core.mainImage core.slug');
        if (!item)
            return res.status(404).json({ success: false, message: 'Case study artifact not found' });
        res.json({ success: true, data: item });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getCaseStudyBySlug = getCaseStudyBySlug;
const createCaseStudy = async (req, res) => {
    try {
        let slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const slugExists = await CaseStudy_1.default.findOne({ slug });
        if (slugExists) {
            slug = `${slug}-${crypto_1.default.randomUUID().substring(0, 5)}`;
        }
        const newItem = new CaseStudy_1.default({ ...req.body, slug });
        await newItem.save();
        res.status(201).json({ success: true, data: newItem });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.createCaseStudy = createCaseStudy;
const updateCaseStudy = async (req, res) => {
    try {
        const item = await CaseStudy_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item)
            return res.status(404).json({ success: false, message: 'Artifact identity lost' });
        res.json({ success: true, data: item });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.updateCaseStudy = updateCaseStudy;
const deleteCaseStudy = async (req, res) => {
    try {
        const item = await CaseStudy_1.default.findByIdAndDelete(req.params.id);
        if (!item)
            return res.status(404).json({ success: false, message: 'Artifact already decommissioned' });
        res.json({ success: true, message: 'Case study artifact purged' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteCaseStudy = deleteCaseStudy;
const getSettings = async (req, res) => {
    try {
        let settings = await CaseStudySettings_1.default.findOne();
        if (!settings) {
            settings = new CaseStudySettings_1.default();
            await settings.save();
        }
        res.json({ success: true, data: settings });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getSettings = getSettings;
const updateSettings = async (req, res) => {
    try {
        const settings = await CaseStudySettings_1.default.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json({ success: true, data: settings });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.updateSettings = updateSettings;
const getAvailableProducts = async (req, res) => {
    try {
        const products = await Product_1.default.find({ 'core.title': { $exists: true } }, 'core.title core.mainImage core.slug');
        res.json({ success: true, data: products });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getAvailableProducts = getAvailableProducts;

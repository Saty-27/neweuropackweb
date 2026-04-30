"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIndustry = exports.updateIndustry = exports.createIndustry = exports.getIndustryBySlug = exports.getIndustries = void 0;
const Industry_1 = __importDefault(require("../models/Industry"));
const getIndustries = async (req, res) => {
    try {
        const filter = req.query.admin === 'true' ? {} : { visible: true };
        const industries = await Industry_1.default.find(filter).sort({ order: 1, createdAt: -1 });
        res.status(200).json({ success: true, data: industries });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getIndustries = getIndustries;
const getIndustryBySlug = async (req, res) => {
    try {
        const industry = await Industry_1.default.findOne({ slug: req.params.slug, visible: true });
        if (!industry)
            return res.status(404).json({ success: false, message: 'Industry not found' });
        res.status(200).json({ success: true, data: industry });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getIndustryBySlug = getIndustryBySlug;
const createIndustry = async (req, res) => {
    try {
        const industry = await Industry_1.default.create(req.body);
        res.status(201).json({ success: true, data: industry });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.createIndustry = createIndustry;
const updateIndustry = async (req, res) => {
    try {
        const industry = await Industry_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!industry)
            return res.status(404).json({ success: false, message: 'Industry not found' });
        res.status(200).json({ success: true, data: industry });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.updateIndustry = updateIndustry;
const deleteIndustry = async (req, res) => {
    try {
        const industry = await Industry_1.default.findByIdAndDelete(req.params.id);
        if (!industry)
            return res.status(404).json({ success: false, message: 'Industry not found' });
        res.status(200).json({ success: true, message: 'Industry deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteIndustry = deleteIndustry;

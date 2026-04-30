"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGlobalSection = exports.updateWelcomeSection = exports.updateCompanies = exports.updateBanners = exports.updateHomepageData = exports.getHomepageData = void 0;
const Homepage_1 = __importDefault(require("../models/Homepage"));
// Helper to get or create the singleton Homepage document
const getSingletonDoc = async () => {
    let doc = await Homepage_1.default.findOne();
    if (!doc) {
        doc = await Homepage_1.default.create({});
    }
    return doc;
};
// --- PUBLIC ROUTE ---
const getHomepageData = async (req, res) => {
    try {
        const doc = await getSingletonDoc();
        res.status(200).json({ success: true, data: doc });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getHomepageData = getHomepageData;
// --- ADMIN ROUTES ---
// 1. Full Document Update (Optional/General)
const updateHomepageData = async (req, res) => {
    try {
        const doc = await getSingletonDoc();
        const updated = await Homepage_1.default.findByIdAndUpdate(doc._id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: updated });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.updateHomepageData = updateHomepageData;
// 2. Banner Specific Updates
const updateBanners = async (req, res) => {
    try {
        const { banners } = req.body; // Expects the full re-ordered array
        const doc = await getSingletonDoc();
        doc.banners = banners;
        await doc.save();
        res.status(200).json({ success: true, data: doc.banners });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.updateBanners = updateBanners;
// 3. Companies Specific Updates
const updateCompanies = async (req, res) => {
    try {
        const { companies } = req.body;
        const doc = await getSingletonDoc();
        doc.companyLogos = companies;
        await doc.save();
        res.status(200).json({ success: true, data: doc.companyLogos });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.updateCompanies = updateCompanies;
// 4. Welcome Section Specific Updates
const updateWelcomeSection = async (req, res) => {
    try {
        const welcomeData = req.body;
        // Strict enforcement handled by mongoose schema validators (3 cards, 4 counters)
        const doc = await getSingletonDoc();
        doc.welcomeSection = welcomeData;
        await doc.save();
        res.status(200).json({ success: true, data: doc.welcomeSection });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message }); // 400 because it's usually a validation error
    }
};
exports.updateWelcomeSection = updateWelcomeSection;
// 5. Global Section Specific Updates
const updateGlobalSection = async (req, res) => {
    try {
        const globalData = req.body;
        const doc = await getSingletonDoc();
        doc.globalSection = globalData;
        await doc.save();
        res.status(200).json({ success: true, data: doc.globalSection });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.updateGlobalSection = updateGlobalSection;

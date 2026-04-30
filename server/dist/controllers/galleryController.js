"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGallerySettings = exports.getGallerySettings = exports.deleteGalleryItem = exports.updateGalleryItem = exports.createGalleryItem = exports.getGalleryItems = void 0;
const GalleryItem_1 = __importDefault(require("../models/GalleryItem"));
const GallerySettings_1 = __importDefault(require("../models/GallerySettings"));
// --- Gallery Items ---
const getGalleryItems = async (req, res) => {
    try {
        const filter = req.query.admin === 'true' ? {} : { visible: true };
        const items = await GalleryItem_1.default.find(filter).sort({ order: 1, createdAt: -1 });
        res.status(200).json({ success: true, data: items });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getGalleryItems = getGalleryItems;
const createGalleryItem = async (req, res) => {
    try {
        const item = await GalleryItem_1.default.create(req.body);
        res.status(201).json({ success: true, data: item });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.createGalleryItem = createGalleryItem;
const updateGalleryItem = async (req, res) => {
    try {
        const item = await GalleryItem_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item)
            return res.status(404).json({ success: false, message: 'Item not found' });
        res.status(200).json({ success: true, data: item });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.updateGalleryItem = updateGalleryItem;
const deleteGalleryItem = async (req, res) => {
    try {
        const item = await GalleryItem_1.default.findByIdAndDelete(req.params.id);
        if (!item)
            return res.status(404).json({ success: false, message: 'Item not found' });
        res.status(200).json({ success: true, message: 'Item deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteGalleryItem = deleteGalleryItem;
// --- Gallery Settings ---
const getGallerySettings = async (req, res) => {
    try {
        let settings = await GallerySettings_1.default.findOne();
        if (!settings) {
            settings = await GallerySettings_1.default.create({});
        }
        res.status(200).json({ success: true, data: settings });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getGallerySettings = getGallerySettings;
const updateGallerySettings = async (req, res) => {
    try {
        let settings = await GallerySettings_1.default.findOne();
        if (!settings) {
            settings = await GallerySettings_1.default.create(req.body);
        }
        else {
            settings = await GallerySettings_1.default.findByIdAndUpdate(settings._id, req.body, { new: true, runValidators: true });
        }
        res.status(200).json({ success: true, data: settings });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.updateGallerySettings = updateGallerySettings;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMediaSettings = exports.getMediaSettings = exports.deleteMediaItem = exports.updateMediaItem = exports.createMediaItem = exports.getMediaItems = void 0;
const MediaItem_1 = __importDefault(require("../models/MediaItem"));
const MediaSettings_1 = __importDefault(require("../models/MediaSettings"));
// --- Media Items ---
const getMediaItems = async (req, res) => {
    try {
        const filter = req.query.admin === 'true' ? {} : { visible: true };
        const items = await MediaItem_1.default.find(filter).sort({ order: 1, createdAt: -1 });
        res.status(200).json({ success: true, data: items });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getMediaItems = getMediaItems;
const createMediaItem = async (req, res) => {
    try {
        const item = await MediaItem_1.default.create(req.body);
        res.status(201).json({ success: true, data: item });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.createMediaItem = createMediaItem;
const updateMediaItem = async (req, res) => {
    try {
        const item = await MediaItem_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item)
            return res.status(404).json({ success: false, message: 'Media item not found' });
        res.status(200).json({ success: true, data: item });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.updateMediaItem = updateMediaItem;
const deleteMediaItem = async (req, res) => {
    try {
        const item = await MediaItem_1.default.findByIdAndDelete(req.params.id);
        if (!item)
            return res.status(404).json({ success: false, message: 'Media item not found' });
        res.status(200).json({ success: true, message: 'Media item deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteMediaItem = deleteMediaItem;
// --- Media Settings ---
const getMediaSettings = async (req, res) => {
    try {
        let settings = await MediaSettings_1.default.findOne();
        if (!settings) {
            settings = await MediaSettings_1.default.create({});
        }
        res.status(200).json({ success: true, data: settings });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getMediaSettings = getMediaSettings;
const updateMediaSettings = async (req, res) => {
    try {
        let settings = await MediaSettings_1.default.findOne();
        if (!settings) {
            settings = await MediaSettings_1.default.create(req.body);
        }
        else {
            settings = await MediaSettings_1.default.findByIdAndUpdate(settings._id, req.body, { new: true, runValidators: true });
        }
        res.status(200).json({ success: true, data: settings });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.updateMediaSettings = updateMediaSettings;

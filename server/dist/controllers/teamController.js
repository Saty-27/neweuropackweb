"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettings = exports.getSettings = exports.reorderMembers = exports.deleteMember = exports.updateMember = exports.addMember = exports.getMembers = void 0;
const TeamMember_1 = __importDefault(require("../models/TeamMember"));
const TeamSettings_1 = __importDefault(require("../models/TeamSettings"));
// --- Team Member CRUD ---
const getMembers = async (req, res) => {
    try {
        const isAdmin = req.query.admin === 'true';
        const query = isAdmin ? {} : { visible: true };
        const members = await TeamMember_1.default.find(query).sort({ order: 1 });
        res.status(200).json({ success: true, data: members });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getMembers = getMembers;
const addMember = async (req, res) => {
    try {
        const count = await TeamMember_1.default.countDocuments();
        const member = await TeamMember_1.default.create({ ...req.body, order: count });
        res.status(201).json({ success: true, data: member });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.addMember = addMember;
const updateMember = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await TeamMember_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!member)
            return res.status(404).json({ success: false, error: 'Member not found' });
        res.status(200).json({ success: true, data: member });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.updateMember = updateMember;
const deleteMember = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await TeamMember_1.default.findByIdAndDelete(id);
        if (!member)
            return res.status(404).json({ success: false, error: 'Member not found' });
        res.status(200).json({ success: true, message: 'Member deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.deleteMember = deleteMember;
const reorderMembers = async (req, res) => {
    try {
        const { memberIds } = req.body;
        const bulkOps = memberIds.map((id, index) => ({
            updateOne: {
                filter: { _id: id },
                update: { order: index }
            }
        }));
        await TeamMember_1.default.bulkWrite(bulkOps);
        res.status(200).json({ success: true, message: 'Reordering successful' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.reorderMembers = reorderMembers;
// --- Team Settings ---
const getSettings = async (req, res) => {
    try {
        let settings = await TeamSettings_1.default.findOne();
        if (!settings) {
            settings = await TeamSettings_1.default.create({});
        }
        res.status(200).json({ success: true, data: settings });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getSettings = getSettings;
const updateSettings = async (req, res) => {
    try {
        let settings = await TeamSettings_1.default.findOne();
        if (settings) {
            settings = await TeamSettings_1.default.findByIdAndUpdate(settings._id, req.body, { new: true });
        }
        else {
            settings = await TeamSettings_1.default.create(req.body);
        }
        res.status(200).json({ success: true, data: settings });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.updateSettings = updateSettings;

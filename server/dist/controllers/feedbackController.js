"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeedback = exports.updateFeedbackStatus = exports.getApprovedFeedback = exports.getAllFeedback = exports.submitFeedback = void 0;
const Feedback_1 = __importDefault(require("../models/Feedback"));
// Submit feedback (Public)
const submitFeedback = async (req, res) => {
    try {
        const feedback = await Feedback_1.default.create(req.body);
        res.status(201).json({ success: true, data: feedback });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.submitFeedback = submitFeedback;
// Get all feedback (Admin)
const getAllFeedback = async (req, res) => {
    try {
        const feedback = await Feedback_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: feedback });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getAllFeedback = getAllFeedback;
// Get approved feedback for homepage (Public)
const getApprovedFeedback = async (req, res) => {
    try {
        const feedback = await Feedback_1.default.find({ status: 'approved' }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: feedback });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getApprovedFeedback = getApprovedFeedback;
// Update feedback status (Admin)
const updateFeedbackStatus = async (req, res) => {
    try {
        const feedback = await Feedback_1.default.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
        if (!feedback) {
            return res.status(404).json({ success: false, error: 'Feedback not found' });
        }
        res.status(200).json({ success: true, data: feedback });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.updateFeedbackStatus = updateFeedbackStatus;
// Delete feedback (Admin)
const deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback_1.default.findByIdAndDelete(req.params.id);
        if (!feedback) {
            return res.status(404).json({ success: false, error: 'Feedback not found' });
        }
        res.status(200).json({ success: true, message: 'Deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.deleteFeedback = deleteFeedback;

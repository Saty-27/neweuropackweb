"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubmission = exports.updateSubmissionStatus = exports.getAllSubmissions = exports.submitContactForm = void 0;
const ContactForm_1 = __importDefault(require("../models/ContactForm"));
// Submit a new contact form (Public)
const submitContactForm = async (req, res) => {
    try {
        const contact = await ContactForm_1.default.create(req.body);
        res.status(201).json({ success: true, data: contact });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.submitContactForm = submitContactForm;
// Get all submissions (Admin)
const getAllSubmissions = async (req, res) => {
    try {
        const submissions = await ContactForm_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: submissions });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getAllSubmissions = getAllSubmissions;
// Update submission status (Admin)
const updateSubmissionStatus = async (req, res) => {
    try {
        const contact = await ContactForm_1.default.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
        if (!contact) {
            return res.status(404).json({ success: false, error: 'Submission not found' });
        }
        res.status(200).json({ success: true, data: contact });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.updateSubmissionStatus = updateSubmissionStatus;
// Delete submission (Admin)
const deleteSubmission = async (req, res) => {
    try {
        const contact = await ContactForm_1.default.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ success: false, error: 'Submission not found' });
        }
        res.status(200).json({ success: true, message: 'Deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.deleteSubmission = deleteSubmission;

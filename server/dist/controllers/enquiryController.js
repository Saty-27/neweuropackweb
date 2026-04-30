"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEnquiry = exports.updateEnquiryStatus = exports.createEnquiry = exports.getEnquiries = void 0;
const Enquiry_1 = __importDefault(require("../models/Enquiry"));
const getEnquiries = async (req, res) => {
    try {
        const { status, service, search } = req.query;
        let query = {};
        if (status)
            query.status = status;
        if (service)
            query.service = service;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } }
            ];
        }
        const enquiries = await Enquiry_1.default.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: enquiries });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getEnquiries = getEnquiries;
const createEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry_1.default.create(req.body);
        res.status(201).json({ success: true, data: enquiry });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.createEnquiry = createEnquiry;
const updateEnquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const enquiry = await Enquiry_1.default.findByIdAndUpdate(id, { status }, { new: true });
        if (!enquiry)
            return res.status(404).json({ success: false, error: 'Enquiry not found' });
        res.status(200).json({ success: true, data: enquiry });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.updateEnquiryStatus = updateEnquiryStatus;
const deleteEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const enquiry = await Enquiry_1.default.findByIdAndDelete(id);
        if (!enquiry)
            return res.status(404).json({ success: false, error: 'Enquiry not found' });
        res.status(200).json({ success: true, message: 'Enquiry deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.deleteEnquiry = deleteEnquiry;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuoteStatus = exports.getQuotes = exports.createQuote = void 0;
const Quote_1 = __importDefault(require("../models/Quote"));
const createQuote = async (req, res) => {
    try {
        const { name, company, email, phone, productType, message } = req.body;
        // Stub for handling file upload if attached (multer)
        let fileUrl = '';
        if (req.file) {
            fileUrl = req.file.path;
        }
        const quote = await Quote_1.default.create({
            name,
            company,
            email,
            phone,
            productType,
            message,
            fileUrl,
            status: 'New'
        });
        res.status(201).json({ success: true, data: quote });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.createQuote = createQuote;
const getQuotes = async (req, res) => {
    try {
        const quotes = await Quote_1.default.find().sort({ createdAt: -1 });
        // Also calculate basic stats for the CRM dashboard
        const total = quotes.length;
        const converted = quotes.filter(q => q.status === 'Converted').length;
        const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : 0;
        res.status(200).json({
            success: true,
            data: quotes,
            stats: { total, converted, conversionRate }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getQuotes = getQuotes;
const updateQuoteStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const quote = await Quote_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
        if (!quote) {
            return res.status(404).json({ success: false, error: 'Quote not found' });
        }
        res.status(200).json({ success: true, data: quote });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.updateQuoteStatus = updateQuoteStatus;

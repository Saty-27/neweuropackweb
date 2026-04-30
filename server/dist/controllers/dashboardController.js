"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const Quote_1 = __importDefault(require("../models/Quote"));
const Product_1 = __importDefault(require("../models/Product"));
const getDashboardStats = async (req, res) => {
    try {
        // 1. Quote Stats
        const totalQuotes = await Quote_1.default.countDocuments();
        const convertedQuotes = await Quote_1.default.countDocuments({ status: 'Converted' });
        const pendingQuotes = await Quote_1.default.countDocuments({ status: { $in: ['New', 'In Progress'] } });
        const conversionRate = totalQuotes > 0 ? ((convertedQuotes / totalQuotes) * 100).toFixed(1) : '0.0';
        // 2. Product Stats
        const totalProducts = await Product_1.default.countDocuments();
        // 3. Visitor Tracking (Stubbed for now, will be replaced with Phase 6 actual tracking)
        const visitors = {
            daily: Math.floor(Math.random() * 50) + 10,
            monthly: Math.floor(Math.random() * 500) + 200,
            lifetime: 5420
        };
        res.status(200).json({
            success: true,
            data: {
                quotes: {
                    total: totalQuotes,
                    converted: convertedQuotes,
                    pending: pendingQuotes,
                    conversionRate: Number(conversionRate)
                },
                products: totalProducts,
                visitors
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getDashboardStats = getDashboardStats;

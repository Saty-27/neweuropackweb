"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveUserStats = exports.getActivityLogs = void 0;
const ActivityLog_1 = __importDefault(require("../models/ActivityLog"));
/**
 * Get system activity logs with filtering
 * @access Super Admin / Admin
 */
const getActivityLogs = async (req, res) => {
    try {
        const { user, action, section, startDate, endDate, limit = 50, skip = 0 } = req.query;
        const query = {};
        if (user)
            query.user = user;
        if (action)
            query.action = action;
        if (section)
            query.section = section;
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate)
                query.createdAt.$gte = new Date(startDate);
            if (endDate)
                query.createdAt.$lte = new Date(endDate);
        }
        const logs = await ActivityLog_1.default.find(query)
            .populate('user', 'name email role')
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .skip(Number(skip));
        const total = await ActivityLog_1.default.countDocuments(query);
        res.status(200).json({
            success: true,
            count: logs.length,
            total,
            data: logs
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Audit trail synchronization failed' });
    }
};
exports.getActivityLogs = getActivityLogs;
/**
 * Get real-time stats for the dashboard monitoring
 * @access Super Admin
 */
const getActiveUserStats = async (req, res) => {
    try {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
        const activeUserCount = await ActivityLog_1.default.distinct('user', {
            createdAt: { $gte: twentyFourHoursAgo }
        });
        const recentActions = await ActivityLog_1.default.countDocuments({
            createdAt: { $gte: twentyFourHoursAgo }
        });
        res.status(200).json({
            success: true,
            activeUsers: activeUserCount.length,
            recentActions
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getActiveUserStats = getActiveUserStats;

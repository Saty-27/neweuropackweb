"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logActivity = void 0;
const ActivityLog_1 = __importDefault(require("../models/ActivityLog"));
const logActivity = async (req, action, section, itemId, description) => {
    try {
        const userId = req.user?._id;
        if (!userId)
            return;
        await ActivityLog_1.default.create({
            user: userId,
            action,
            section,
            itemId,
            description,
            ipAddress: req.ip,
            userAgent: req.get('User-Agent')
        });
    }
    catch (error) {
        console.error('Failed to log activity:', error);
    }
};
exports.logActivity = logActivity;

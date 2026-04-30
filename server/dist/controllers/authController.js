"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const logger_1 = require("../utils/logger");
const generateToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user exists
        const userExists = await User_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, error: 'Identity already exists in ecosystem' });
        }
        // Default role is Viewer for new registrations
        const user = await User_1.default.create({ name, email, password, role: 'Viewer', status: 'active' });
        res.status(201).json({
            success: true,
            token: generateToken(user._id, user.role),
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Credentials required for ecosystem entry' });
        }
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, error: 'Credential validation failed' });
        }
        if (user.status === 'inactive') {
            return res.status(401).json({ success: false, error: 'Identity is currently deactivated' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Credential validation failed' });
        }
        user.lastLogin = new Date();
        await user.save();
        // Log the industrial entry
        await (0, logger_1.logActivity)(req, 'login', 'auth', user._id.toString(), `Identity authenticated: ${user.email}`);
        res.status(200).json({
            success: true,
            token: generateToken(user._id, user.role),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                permissions: user.permissions
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user?._id).select('-password');
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to synchronize identity' });
    }
};
exports.getMe = getMe;

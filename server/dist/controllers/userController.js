"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleUserStatus = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const logger_1 = require("../utils/logger");
/**
 * Get all users for administration
 * @access Super Admin / Admin
 */
const getUsers = async (req, res) => {
    try {
        const users = await User_1.default.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: users.length, data: users });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to retrieve industrial team artifacts' });
    }
};
exports.getUsers = getUsers;
/**
 * Create a new administrative user
 * @access Super Admin
 */
const createUser = async (req, res) => {
    try {
        const { name, email, password, role, permissions } = req.body;
        const userExists = await User_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, error: 'Identity already exists in ecosystem' });
        }
        const user = await User_1.default.create({
            name,
            email,
            password,
            role,
            permissions,
            status: 'active'
        });
        await (0, logger_1.logActivity)(req, 'create', 'users', user._id.toString(), `Architected new user identity: ${email}`);
        res.status(201).json({ success: true, data: user });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.createUser = createUser;
/**
 * Update user identity and permissions
 * @access Super Admin
 */
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role, permissions, status, password } = req.body;
        const user = await User_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User identity not found' });
        }
        // Protection for Super Admin identity (Only one Super Admin allowed)
        if (user.role === 'Super Admin' && role !== 'Super Admin' && req.user?.role !== 'Super Admin') {
            return res.status(403).json({ success: false, error: 'Cannot downgrade Super Admin clearance' });
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        user.permissions = permissions || user.permissions;
        user.status = status || user.status;
        if (password) {
            user.password = password;
        }
        await user.save();
        await (0, logger_1.logActivity)(req, 'update', 'users', id, `Refined user identity: ${user.email}`);
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.updateUser = updateUser;
/**
 * Delete user identity
 * @access Super Admin
 */
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User identity not found' });
        }
        if (user.role === 'Super Admin') {
            return res.status(403).json({ success: false, error: 'Cannot delete mission-critical Super Admin' });
        }
        await user.deleteOne();
        await (0, logger_1.logActivity)(req, 'delete', 'users', id, `Decommissioned user identity: ${user.email}`);
        res.status(200).json({ success: true, message: 'Identity removed from ecosystem' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.deleteUser = deleteUser;
/**
 * Toggle user active status
 * @access Super Admin
 */
const toggleUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.default.findById(id);
        if (!user)
            return res.status(404).json({ success: false, error: 'Identity not found' });
        user.status = user.status === 'active' ? 'inactive' : 'active';
        await user.save();
        await (0, logger_1.logActivity)(req, 'update', 'users', id, `Toggled status for ${user.email} to ${user.status}`);
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.toggleUserStatus = toggleUserStatus;

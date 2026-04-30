"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizePermission = exports.authorize = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({ success: false, error: 'Ecosystem Access Denied: No identity token provided' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await User_1.default.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ success: false, error: 'Ecosystem Identity Failure: User ID unrecognized' });
        }
        if (user.status === 'inactive') {
            return res.status(403).json({ success: false, error: 'Ecosystem Identity Failure: Account is currently deactivated' });
        }
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ success: false, error: 'Ecosystem Access Denied: Identity token is invalid or expired' });
    }
};
exports.protect = protect;
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, error: 'Identity validation failed: No user context' });
        }
        // Industrial Robustness: Support both 'Super Admin' (new) and 'SuperAdmin' (legacy)
        const userRole = req.user.role?.replace(/\s/g, '').toLowerCase() || '';
        const normalizedRoles = roles.map(r => r.replace(/\s/g, '').toLowerCase());
        if (!normalizedRoles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                error: `Access Denied: Role '${req.user.role}' lacks clearance for this industrial segment`
            });
        }
        next();
    };
};
exports.authorize = authorize;
/**
 * Granular Permission Middleware
 * @param section Section key from IPermissionMatrix (e.g., 'products')
 * @param action CRUD action ('view', 'create', 'edit', 'delete')
 */
const authorizePermission = (section, action) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, error: 'Not authorized' });
        }
        // Super Admin has full clearance override
        if (req.user.role === 'Super Admin') {
            return next();
        }
        const permissions = req.user.permissions;
        const sectionPermissions = permissions?.[section];
        if (!sectionPermissions || !sectionPermissions[action]) {
            return res.status(403).json({
                success: false,
                error: `Action forbidden: No '${action}' permission for '${section}'`
            });
        }
        next();
    };
};
exports.authorizePermission = authorizePermission;

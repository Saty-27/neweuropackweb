"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSuperAdmin = void 0;
const User_1 = __importDefault(require("../models/User"));
/**
 * Seed Super Admin identity and migrate legacy roles/permissions
 */
const seedSuperAdmin = async () => {
    try {
        // 1. Global Role Migration (Legacy -> New RBAC)
        // Synchronize 'SuperAdmin' (no space) to 'Super Admin'
        await User_1.default.updateMany({ role: 'SuperAdmin' }, { $set: { role: 'Super Admin' } });
        // Synchronize 'SubAdmin' to 'Admin'
        await User_1.default.updateMany({ role: 'SubAdmin' }, { $set: { role: 'Admin' } });
        // Synchronize 'Employee' to 'Editor'
        await User_1.default.updateMany({ role: 'Employee' }, { $set: { role: 'Editor' } });
        // 2. CRITICAL: Fix malformed permissions (e.g., ["*"] legacy array)
        // We target any user where permissions is not a proper object or is the legacy wildcard
        // Using a broad reset for Super Admins to be safe
        const fullPermissions = {
            products: { view: true, create: true, edit: true, delete: true },
            blogs: { view: true, create: true, edit: true, delete: true },
            gallery: { view: true, create: true, edit: true, delete: true },
            media: { view: true, create: true, edit: true, delete: true },
            caseStudies: { view: true, create: true, edit: true, delete: true },
            industries: { view: true, create: true, edit: true, delete: true },
            services: { view: true, create: true, edit: true, delete: true },
            team: { view: true, create: true, edit: true, delete: true },
            faqs: { view: true, create: true, edit: true, delete: true },
            enquiries: { view: true, create: true, edit: true, delete: true },
            quotes: { view: true, create: true, edit: true, delete: true },
            leads: { view: true, create: true, edit: true, delete: true },
            settings: { view: true, create: true, edit: true, delete: true }
        };
        // Force-reset permissions for all Super Admins to ensure the matrix is synchronized
        await User_1.default.updateMany({ role: 'Super Admin' }, { $set: { permissions: fullPermissions } });
        // 3. Ensure Super Admin Identity Exists
        const adminExists = await User_1.default.findOne({ email: 'admin@europack.in' });
        if (!adminExists) {
            await User_1.default.create({
                name: 'Super Admin',
                email: 'admin@europack.in',
                password: 'adminpassword123',
                role: 'Super Admin',
                permissions: fullPermissions,
                status: 'active'
            });
            console.log('✅ Super Admin identity seeded and legacy identifiers synchronized');
        }
        else {
            // In case the email exists but role wasn't Super Admin
            if (adminExists.role !== 'Super Admin') {
                adminExists.role = 'Super Admin';
                adminExists.permissions = fullPermissions;
                await adminExists.save();
            }
        }
    }
    catch (err) {
        console.error('❌ Failed to synchronize industrial identity matrix:', err);
    }
};
exports.seedSuperAdmin = seedSuperAdmin;

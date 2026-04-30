import { Request, Response } from 'express';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';
import { logActivity } from '../utils/logger';

/**
 * Get all users for administration
 * @access Super Admin / Admin
 */
export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve industrial team artifacts' });
  }
};

/**
 * Create a new administrative user
 * @access Super Admin
 */
export const createUser = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, password, role, permissions } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, error: 'Identity already exists in ecosystem' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      permissions,
      status: 'active'
    });

    await logActivity(req, 'create', 'users', user._id.toString(), `Architected new user identity: ${email}`);

    res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * Update user identity and permissions
 * @access Super Admin
 */
export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, role, permissions, status, password } = req.body;

    const user = await User.findById(id);
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
    await logActivity(req, 'update', 'users', id as string, `Refined user identity: ${user.email}`);

    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * Delete user identity
 * @access Super Admin
 */
export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User identity not found' });
    }

    if (user.role === 'Super Admin') {
      return res.status(403).json({ success: false, error: 'Cannot delete mission-critical Super Admin' });
    }

    await user.deleteOne();
    await logActivity(req, 'delete', 'users', id as string, `Decommissioned user identity: ${user.email}`);

    res.status(200).json({ success: true, message: 'Identity removed from ecosystem' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Toggle user active status
 * @access Super Admin
 */
export const toggleUserStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) return res.status(404).json({ success: false, error: 'Identity not found' });
    
    user.status = user.status === 'active' ? 'inactive' : 'active';
    await user.save();
    
    await logActivity(req, 'update', 'users', id as string, `Toggled status for ${user.email} to ${user.status}`);
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

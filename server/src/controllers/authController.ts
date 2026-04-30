import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';
import { logActivity } from '../utils/logger';

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: '30d'
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, error: 'Identity already exists in ecosystem' });
    }

    // Default role is Viewer for new registrations
    const user = await User.create({ name, email, password, role: 'Viewer', status: 'active' });

    res.status(201).json({
      success: true,
      token: generateToken((user._id as unknown) as string, user.role),
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Credentials required for ecosystem entry' });
    }

    const user = await User.findOne({ email });
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
    await logActivity(req, 'login', 'auth', user._id.toString(), `Identity authenticated: ${user.email}`);

    res.status(200).json({
      success: true,
      token: generateToken((user._id as unknown) as string, user.role),
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role, 
        permissions: user.permissions 
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?._id).select('-password');
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to synchronize identity' });
  }
};

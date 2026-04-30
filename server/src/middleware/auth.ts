import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser, IPermissionMatrix, ISectionPermissions } from '../models/User';

export interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Ecosystem Access Denied: No identity token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ success: false, error: 'Ecosystem Identity Failure: User ID unrecognized' });
    }

    if (user.status === 'inactive') {
      return res.status(403).json({ success: false, error: 'Ecosystem Identity Failure: Account is currently deactivated' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Ecosystem Access Denied: Identity token is invalid or expired' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
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

export const admin = authorize('Super Admin');

/**
 * Granular Permission Middleware
 * @param section Section key from IPermissionMatrix (e.g., 'products')
 * @param action CRUD action ('view', 'create', 'edit', 'delete')
 */
export const authorizePermission = (section: keyof IPermissionMatrix, action: keyof ISectionPermissions) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    // Super Admin has full clearance override
    if (req.user.role === 'Super Admin') {
      return next();
    }

    const permissions = req.user.permissions as any;
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

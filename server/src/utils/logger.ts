import ActivityLog from '../models/ActivityLog';
import { Request } from 'express';

export const logActivity = async (
  req: Request, 
  action: 'create' | 'update' | 'delete' | 'view' | 'login' | 'logout' | 'upload',
  section: string,
  itemId: string | undefined,
  description: string
) => {
  try {
    const userId = (req as any).user?._id;
    if (!userId) return;

    await ActivityLog.create({
      user: userId,
      action,
      section,
      itemId,
      description,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};

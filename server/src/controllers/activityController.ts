import { Request, Response } from 'express';
import ActivityLog from '../models/ActivityLog';
import { AuthRequest } from '../middleware/auth';

/**
 * Get system activity logs with filtering
 * @access Super Admin / Admin
 */
export const getActivityLogs = async (req: AuthRequest, res: Response) => {
  try {
    const { user, action, section, startDate, endDate, limit = 50, skip = 0 } = req.query;

    const query: any = {};
    if (user) query.user = user;
    if (action) query.action = action;
    if (section) query.section = section;
    
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate as string);
      if (endDate) query.createdAt.$lte = new Date(endDate as string);
    }

    const logs = await ActivityLog.find(query)
      .populate('user', 'name email role')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(Number(skip));

    const total = await ActivityLog.countDocuments(query);

    res.status(200).json({ 
      success: true, 
      count: logs.length,
      total,
      data: logs 
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Audit trail synchronization failed' });
  }
};

/**
 * Get real-time stats for the dashboard monitoring
 * @access Super Admin
 */
export const getActiveUserStats = async (req: AuthRequest, res: Response) => {
  try {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const activeUserCount = await ActivityLog.distinct('user', {
      createdAt: { $gte: twentyFourHoursAgo }
    });

    const recentActions = await ActivityLog.countDocuments({
      createdAt: { $gte: twentyFourHoursAgo }
    });

    res.status(200).json({
      success: true,
      activeUsers: activeUserCount.length,
      recentActions
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

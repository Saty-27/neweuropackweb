import { Request, Response } from 'express';
import PageVisit from '../models/PageVisit';

export const logVisit = async (req: Request, res: Response) => {
  try {
    const { url, referrer, sessionId } = req.body;
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.ip || '';

    await PageVisit.create({
      url,
      referrer,
      sessionId,
      userAgent,
      ip
    });

    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const totalVisits = await PageVisit.countDocuments();
    const uniqueSessions = await PageVisit.distinct('sessionId');
    
    // Top visited pages
    const topPages = await PageVisit.aggregate([
      { $group: { _id: '$url', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalVisits,
        uniqueVisitors: uniqueSessions.length,
        topPages
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

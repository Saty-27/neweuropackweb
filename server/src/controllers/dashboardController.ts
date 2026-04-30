import { Response } from 'express';
import Quote from '../models/Quote';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/auth';

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    // 1. Quote Stats
    const totalQuotes = await Quote.countDocuments();
    const convertedQuotes = await Quote.countDocuments({ status: 'Converted' });
    const pendingQuotes = await Quote.countDocuments({ status: { $in: ['New', 'In Progress'] } });
    const conversionRate = totalQuotes > 0 ? ((convertedQuotes / totalQuotes) * 100).toFixed(1) : '0.0';

    // 2. Product Stats
    const totalProducts = await Product.countDocuments();

    // 3. Visitor Tracking (Stubbed for now, will be replaced with Phase 6 actual tracking)
    const visitors = {
      daily: Math.floor(Math.random() * 50) + 10,
      monthly: Math.floor(Math.random() * 500) + 200,
      lifetime: 5420
    };

    res.status(200).json({
      success: true,
      data: {
        quotes: {
          total: totalQuotes,
          converted: convertedQuotes,
          pending: pendingQuotes,
          conversionRate: Number(conversionRate)
        },
        products: totalProducts,
        visitors
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

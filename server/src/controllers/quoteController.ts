import { Request, Response } from 'express';
import Quote from '../models/Quote';
import { AuthRequest } from '../middleware/auth';

export const createQuote = async (req: Request, res: Response) => {
  try {
    const { name, company, email, phone, productType, message } = req.body;
    
    // Stub for handling file upload if attached (multer)
    let fileUrl = '';
    if (req.file) {
      fileUrl = req.file.path;
    }

    const quote = await Quote.create({
      name,
      company,
      email,
      phone,
      productType,
      message,
      fileUrl,
      status: 'New'
    });

    res.status(201).json({ success: true, data: quote });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getQuotes = async (req: AuthRequest, res: Response) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    // Also calculate basic stats for the CRM dashboard
    const total = quotes.length;
    const converted = quotes.filter(q => q.status === 'Converted').length;
    const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : 0;
    
    res.status(200).json({ 
      success: true, 
      data: quotes,
      stats: { total, converted, conversionRate }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateQuoteStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const quote = await Quote.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    
    if (!quote) {
      return res.status(404).json({ success: false, error: 'Quote not found' });
    }
    
    res.status(200).json({ success: true, data: quote });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

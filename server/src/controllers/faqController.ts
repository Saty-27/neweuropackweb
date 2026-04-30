import { Request, Response } from 'express';
import FAQ from '../models/FAQ';
import FAQSettings from '../models/FAQSettings';
import { AuthRequest } from '../middleware/auth';

// --- FAQ CRUD ---

export const getFAQs = async (req: Request, res: Response) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: faqs });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createFAQ = async (req: AuthRequest, res: Response) => {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json({ success: true, data: faq });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateFAQ = async (req: AuthRequest, res: Response) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!faq) return res.status(404).json({ success: false, error: 'FAQ not found' });
    res.status(200).json({ success: true, data: faq });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteFAQ = async (req: AuthRequest, res: Response) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) return res.status(404).json({ success: false, error: 'FAQ not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// --- FAQ SETTINGS ---

export const getAllSettings = async (req: Request, res: Response) => {
  try {
    const settings = await FAQSettings.find();
    res.status(200).json({ success: true, data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getPageSettings = async (req: Request, res: Response) => {
  try {
    const { page } = req.params;
    let settings = await FAQSettings.findOne({ page: page as string });
    if (!settings) {
      settings = await FAQSettings.create({ page: page as string });
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updatePageSettings = async (req: AuthRequest, res: Response) => {
  try {
    const { page } = req.params;
    const settings = await FAQSettings.findOneAndUpdate(
      { page: page as string },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: settings });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// --- PUBLIC FETCH ---

export const getPublicFAQs = async (req: Request, res: Response) => {
  try {
    const { page } = req.params;
    const settings = await FAQSettings.findOne({ page: page as string }) || await FAQSettings.create({ page: page as string });
    const faqs = await FAQ.find({ pages: page as string, isActive: true }).sort({ order: 1 });
    
    res.status(200).json({ 
      success: true, 
      data: {
        settings,
        faqs
      } 
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

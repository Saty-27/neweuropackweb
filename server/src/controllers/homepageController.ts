import { Request, Response } from 'express';
import Homepage, { IHomepage } from '../models/Homepage';
import { AuthRequest } from '../middleware/auth';

// Helper to get or create the singleton Homepage document
const getSingletonDoc = async () => {
  let doc = await Homepage.findOne();
  if (!doc) {
    doc = await Homepage.create({});
  }
  return doc;
};

// --- PUBLIC ROUTE ---

export const getHomepageData = async (req: Request, res: Response) => {
  try {
    const doc = await getSingletonDoc();
    res.status(200).json({ success: true, data: doc });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// --- ADMIN ROUTES ---

// 1. Full Document Update (Optional/General)
export const updateHomepageData = async (req: AuthRequest, res: Response) => {
  try {
    const doc = await getSingletonDoc();
    const updated = await Homepage.findByIdAndUpdate(doc._id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2. Banner Specific Updates
export const updateBanners = async (req: AuthRequest, res: Response) => {
  try {
    const { banners } = req.body; // Expects the full re-ordered array
    const doc = await getSingletonDoc();
    doc.banners = banners;
    await doc.save();
    res.status(200).json({ success: true, data: doc.banners });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 3. Companies Specific Updates
export const updateCompanies = async (req: AuthRequest, res: Response) => {
  try {
    const { companies } = req.body; 
    const doc = await getSingletonDoc();
    doc.companyLogos = companies;
    await doc.save();
    res.status(200).json({ success: true, data: doc.companyLogos });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 4. Welcome Section Specific Updates
export const updateWelcomeSection = async (req: AuthRequest, res: Response) => {
  try {
    const welcomeData = req.body;
    
    // Strict enforcement handled by mongoose schema validators (3 cards, 4 counters)
    const doc = await getSingletonDoc();
    doc.welcomeSection = welcomeData;
    await doc.save();
    
    res.status(200).json({ success: true, data: doc.welcomeSection });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message }); // 400 because it's usually a validation error
  }
};

// 5. Global Section Specific Updates
export const updateGlobalSection = async (req: AuthRequest, res: Response) => {
  try {
    const globalData = req.body;
    const doc = await getSingletonDoc();
    doc.globalSection = globalData;
    await doc.save();
    res.status(200).json({ success: true, data: doc.globalSection });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

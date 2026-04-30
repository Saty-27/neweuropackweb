import { Request, Response } from 'express';
import CMSPage from '../models/CMSPage';
import { AuthRequest } from '../middleware/auth';

// Public endpoint to get standard page content by slug
export const getPageContent = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const page = await CMSPage.findOne({ slug });
    
    if (!page) {
      return res.status(404).json({ success: false, error: 'Page content not found' });
    }
    
    res.status(200).json({ success: true, data: page });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Admin endpoint to get all CMS pages
export const getAllPages = async (req: AuthRequest, res: Response) => {
  try {
    const pages = await CMSPage.find();
    res.status(200).json({ success: true, data: pages });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Admin endpoint to update or create a page's content
export const savePageContent = async (req: AuthRequest, res: Response) => {
  try {
    const { slug, title, content, type } = req.body;
    
    const page = await CMSPage.findOneAndUpdate(
      { slug },
      { slug, title, content, type: type || 'page' },
      { new: true, upsert: true, runValidators: true } // Creates if it doesn't exist
    );

    res.status(200).json({ success: true, data: page });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

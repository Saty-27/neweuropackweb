import { Request, Response } from 'express';
import CustomPage from '../models/CustomPage';
import { AuthRequest } from '../middleware/auth';

// Get all custom pages (Admin)
export const getPages = async (req: AuthRequest, res: Response) => {
  try {
    const pages = await CustomPage.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: pages });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single page by slug (Public)
export const getPageBySlug = async (req: Request, res: Response) => {
  try {
    const page = await CustomPage.findOne({ slug: req.params.slug, isPublished: true });
    if (!page) {
      return res.status(404).json({ success: false, error: 'Page not found' });
    }
    res.status(200).json({ success: true, data: page });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single page by ID (Admin)
export const getPageById = async (req: AuthRequest, res: Response) => {
  try {
    const page = await CustomPage.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ success: false, error: 'Page not found' });
    }
    res.status(200).json({ success: true, data: page });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create page (Admin)
export const createPage = async (req: AuthRequest, res: Response) => {
  try {
    const page = await CustomPage.create(req.body);
    res.status(201).json({ success: true, data: page });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update page (Admin)
export const updatePage = async (req: AuthRequest, res: Response) => {
  try {
    const page = await CustomPage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!page) {
      return res.status(404).json({ success: false, error: 'Page not found' });
    }
    res.status(200).json({ success: true, data: page });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete page (Admin)
export const deletePage = async (req: AuthRequest, res: Response) => {
  try {
    const page = await CustomPage.findByIdAndDelete(req.params.id);
    if (!page) {
      return res.status(404).json({ success: false, error: 'Page not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

import { Request, Response } from 'express';
import Industry from '../models/Industry';

export const getIndustries = async (req: Request, res: Response) => {
  try {
    const filter = req.query.admin === 'true' ? {} : { visible: true };
    const industries = await Industry.find(filter).sort({ order: 1, createdAt: -1 }).lean();
    res.status(200).json({ success: true, data: industries });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getIndustryBySlug = async (req: Request, res: Response) => {
  try {
    const industry = await Industry.findOne({ slug: req.params.slug, visible: true }).lean();
    if (!industry) return res.status(404).json({ success: false, message: 'Industry not found' });
    res.status(200).json({ success: true, data: industry });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createIndustry = async (req: Request, res: Response) => {
  try {
    const industry = await Industry.create(req.body);
    res.status(201).json({ success: true, data: industry });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateIndustry = async (req: Request, res: Response) => {
  try {
    const industry = await Industry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!industry) return res.status(404).json({ success: false, message: 'Industry not found' });
    res.status(200).json({ success: true, data: industry });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteIndustry = async (req: Request, res: Response) => {
  try {
    const industry = await Industry.findByIdAndDelete(req.params.id);
    if (!industry) return res.status(404).json({ success: false, message: 'Industry not found' });
    res.status(200).json({ success: true, message: 'Industry deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

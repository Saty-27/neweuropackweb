import { Request, Response } from 'express';
import CaseStudy from '../models/CaseStudy';
import CaseStudySettings from '../models/CaseStudySettings';
import Product from '../models/Product';
import crypto from 'crypto';

export const getCaseStudies = async (req: Request, res: Response) => {
  try {
    const isAdmin = req.query.admin === 'true';
    const filter = isAdmin ? {} : { visible: true };
    const items = await CaseStudy.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .populate('productsUsed', 'core.title core.mainImage core.slug')
      .lean();
    res.json({ success: true, data: items });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCaseStudyBySlug = async (req: Request, res: Response) => {
  try {
    const item = await CaseStudy.findOne({ slug: req.params.slug, visible: true })
      .populate('productsUsed', 'core.title core.mainImage core.slug')
      .lean();
    if (!item) return res.status(404).json({ success: false, message: 'Case study artifact not found' });
    res.json({ success: true, data: item });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCaseStudy = async (req: Request, res: Response) => {
  try {
    let slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const slugExists = await CaseStudy.findOne({ slug });
    if (slugExists) {
      slug = `${slug}-${crypto.randomUUID().substring(0, 5)}`;
    }
    
    const newItem = new CaseStudy({ ...req.body, slug });
    await newItem.save();
    res.status(201).json({ success: true, data: newItem });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateCaseStudy = async (req: Request, res: Response) => {
  try {
    const item = await CaseStudy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Artifact identity lost' });
    res.json({ success: true, data: item });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCaseStudy = async (req: Request, res: Response) => {
  try {
    const item = await CaseStudy.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Artifact already decommissioned' });
    res.json({ success: true, message: 'Case study artifact purged' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSettings = async (req: Request, res: Response) => {
  try {
    let settings = await CaseStudySettings.findOne();
    if (!settings) {
      settings = new CaseStudySettings();
      await settings.save();
    }
    res.json({ success: true, data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const settings = await CaseStudySettings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json({ success: true, data: settings });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAvailableProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ 'core.title': { $exists: true } }, 'core.title core.mainImage core.slug');
    res.json({ success: true, data: products });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

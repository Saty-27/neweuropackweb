import { Request, Response } from 'express';
import ServicePage from '../models/ServicePage';

export const getServicePages = async (req: Request, res: Response) => {
  try {
    const isAdmin = req.query.admin === 'true';
    const query = isAdmin ? {} : { visible: true, status: 'published' };
    const pages = await ServicePage.find(query).sort({ createdAt: -1 }).lean();
    res.status(200).json({ success: true, data: pages });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getServiceBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const page = await ServicePage.findOne({ slug, visible: true, status: 'published' }).lean();
    if (!page) return res.status(404).json({ success: false, error: 'Service page not found' });
    res.status(200).json({ success: true, data: page });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createServicePage = async (req: Request, res: Response) => {
  try {
    const page = await ServicePage.create(req.body);
    res.status(201).json({ success: true, data: page });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateServicePage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const page = await ServicePage.findByIdAndUpdate(id, req.body, { new: true });
    if (!page) return res.status(404).json({ success: false, error: 'Service page not found' });
    res.status(200).json({ success: true, data: page });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteServicePage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const page = await ServicePage.findByIdAndDelete(id);
    if (!page) return res.status(404).json({ success: false, error: 'Service page not found' });
    res.status(200).json({ success: true, message: 'Service page deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

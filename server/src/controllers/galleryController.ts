import { Request, Response } from 'express';
import GalleryItem from '../models/GalleryItem';
import GallerySettings from '../models/GallerySettings';

// --- Gallery Items ---
export const getGalleryItems = async (req: Request, res: Response) => {
  try {
    const filter = req.query.admin === 'true' ? {} : { visible: true };
    const items = await GalleryItem.find(filter).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: items });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createGalleryItem = async (req: Request, res: Response) => {
  try {
    const item = await GalleryItem.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateGalleryItem = async (req: Request, res: Response) => {
  try {
    const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.status(200).json({ success: true, data: item });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteGalleryItem = async (req: Request, res: Response) => {
  try {
    const item = await GalleryItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.status(200).json({ success: true, message: 'Item deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- Gallery Settings ---
export const getGallerySettings = async (req: Request, res: Response) => {
  try {
    let settings = await GallerySettings.findOne();
    if (!settings) {
      settings = await GallerySettings.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateGallerySettings = async (req: Request, res: Response) => {
  try {
    let settings = await GallerySettings.findOne();
    if (!settings) {
      settings = await GallerySettings.create(req.body);
    } else {
      settings = await GallerySettings.findByIdAndUpdate(settings._id, req.body, { new: true, runValidators: true });
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

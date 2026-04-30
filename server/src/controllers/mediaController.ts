import { Request, Response } from 'express';
import MediaItem from '../models/MediaItem';
import MediaSettings from '../models/MediaSettings';

// --- Media Items ---
export const getMediaItems = async (req: Request, res: Response) => {
  try {
    const filter = req.query.admin === 'true' ? {} : { visible: true };
    const items = await MediaItem.find(filter).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: items });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createMediaItem = async (req: Request, res: Response) => {
  try {
    const item = await MediaItem.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateMediaItem = async (req: Request, res: Response) => {
  try {
    const item = await MediaItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Media item not found' });
    res.status(200).json({ success: true, data: item });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteMediaItem = async (req: Request, res: Response) => {
  try {
    const item = await MediaItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Media item not found' });
    res.status(200).json({ success: true, message: 'Media item deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- Media Settings ---
export const getMediaSettings = async (req: Request, res: Response) => {
  try {
    let settings = await MediaSettings.findOne();
    if (!settings) {
      settings = await MediaSettings.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMediaSettings = async (req: Request, res: Response) => {
  try {
    let settings = await MediaSettings.findOne();
    if (!settings) {
      settings = await MediaSettings.create(req.body);
    } else {
      settings = await MediaSettings.findByIdAndUpdate(settings._id, req.body, { new: true, runValidators: true });
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

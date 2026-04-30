import { Request, Response } from 'express';
import TeamMember from '../models/TeamMember';
import TeamSettings from '../models/TeamSettings';

// --- Team Member CRUD ---

export const getMembers = async (req: Request, res: Response) => {
  try {
    const isAdmin = req.query.admin === 'true';
    const query = isAdmin ? {} : { visible: true };
    const members = await TeamMember.find(query).sort({ order: 1 });
    res.status(200).json({ success: true, data: members });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const addMember = async (req: Request, res: Response) => {
  try {
    const count = await TeamMember.countDocuments();
    const member = await TeamMember.create({ ...req.body, order: count });
    res.status(201).json({ success: true, data: member });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const member = await TeamMember.findByIdAndUpdate(id, req.body, { new: true });
    if (!member) return res.status(404).json({ success: false, error: 'Member not found' });
    res.status(200).json({ success: true, data: member });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const member = await TeamMember.findByIdAndDelete(id);
    if (!member) return res.status(404).json({ success: false, error: 'Member not found' });
    res.status(200).json({ success: true, message: 'Member deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const reorderMembers = async (req: Request, res: Response) => {
  try {
    const { memberIds } = req.body;
    const bulkOps = memberIds.map((id: string, index: number) => ({
      updateOne: {
        filter: { _id: id },
        update: { order: index }
      }
    }));
    await TeamMember.bulkWrite(bulkOps);
    res.status(200).json({ success: true, message: 'Reordering successful' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// --- Team Settings ---

export const getSettings = async (req: Request, res: Response) => {
  try {
    let settings = await TeamSettings.findOne();
    if (!settings) {
      settings = await TeamSettings.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    let settings = await TeamSettings.findOne();
    if (settings) {
      settings = await TeamSettings.findByIdAndUpdate(settings._id, req.body, { new: true });
    } else {
      settings = await TeamSettings.create(req.body);
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

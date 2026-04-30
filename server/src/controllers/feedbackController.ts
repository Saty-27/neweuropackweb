import { Request, Response } from 'express';
import Feedback from '../models/Feedback';

// Submit feedback (Public)
export const submitFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json({ success: true, data: feedback });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all feedback (Admin)
export const getAllFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: feedback });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get approved feedback for homepage (Public)
export const getApprovedFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = await Feedback.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: feedback });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update feedback status (Admin)
export const updateFeedbackStatus = async (req: Request, res: Response) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!feedback) {
      return res.status(404).json({ success: false, error: 'Feedback not found' });
    }
    res.status(200).json({ success: true, data: feedback });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete feedback (Admin)
export const deleteFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ success: false, error: 'Feedback not found' });
    }
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

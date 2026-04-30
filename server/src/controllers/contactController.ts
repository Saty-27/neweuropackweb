import { Request, Response } from 'express';
import ContactForm from '../models/ContactForm';

// Submit a new contact form (Public)
export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const contact = await ContactForm.create(req.body);
    res.status(201).json({ success: true, data: contact });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all submissions (Admin)
export const getAllSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await ContactForm.find().sort({ createdAt: -1 }).lean();
    res.status(200).json({ success: true, data: submissions });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update submission status (Admin)
export const updateSubmissionStatus = async (req: Request, res: Response) => {
  try {
    const contact = await ContactForm.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({ success: false, error: 'Submission not found' });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete submission (Admin)
export const deleteSubmission = async (req: Request, res: Response) => {
  try {
    const contact = await ContactForm.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, error: 'Submission not found' });
    }
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

import { Request, Response } from 'express';
import Enquiry from '../models/Enquiry';

export const getEnquiries = async (req: Request, res: Response) => {
  try {
    const { status, service, search } = req.query;
    let query: any = {};
    if (status) query.status = status;
    if (service) query.service = service;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: enquiries });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createEnquiry = async (req: Request, res: Response) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json({ success: true, data: enquiry });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateEnquiryStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });
    if (!enquiry) return res.status(404).json({ success: false, error: 'Enquiry not found' });
    res.status(200).json({ success: true, data: enquiry });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteEnquiry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findByIdAndDelete(id);
    if (!enquiry) return res.status(404).json({ success: false, error: 'Enquiry not found' });
    res.status(200).json({ success: true, message: 'Enquiry deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

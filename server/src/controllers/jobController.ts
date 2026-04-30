import { Request, Response } from 'express';
import Job from '../models/Job';
import JobSettings from '../models/JobSettings';

// --- Job Controllers --- //

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const { department, active, sort = 'order -createdAt' } = req.query;
    const query: any = {};
    
    if (department) query.department = department;
    if (active !== undefined) query.active = active === 'true';

    const jobs = await Job.find(query).sort(sort as string);
    const total = await Job.countDocuments(query);

    res.status(200).json({ success: true, jobs, total });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }
    res.status(200).json({ success: true, job });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ success: true, job });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!job) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }

    res.status(200).json({ success: true, job });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }

    res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// --- Job Settings Controllers --- //

export const getJobSettings = async (req: Request, res: Response) => {
  try {
    let settings = await JobSettings.findOne();
    if (!settings) {
      settings = await JobSettings.create({ visible: true });
    }
    res.status(200).json({ success: true, settings });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateJobSettings = async (req: Request, res: Response) => {
  try {
    let settings = await JobSettings.findOne();
    if (!settings) {
      settings = await JobSettings.create(req.body);
    } else {
      settings = await JobSettings.findByIdAndUpdate(settings._id, req.body, {
        new: true,
        runValidators: true
      });
    }
    res.status(200).json({ success: true, settings });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

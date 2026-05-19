import { Request, Response } from 'express';
import SiteSettings from '../models/SiteSettings';
import { AuthRequest } from '../middleware/auth';

// Get site settings (Public & Admin)
export const getSiteSettings = async (req: Request, res: Response) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({
        googleSiteVerification: '',
        bingSiteVerification: '',
        yahooSiteVerification: '',
        googleAnalyticsId: '',
        htmlVerificationFiles: []
      });
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update site settings (Admin only)
export const updateSiteSettings = async (req: AuthRequest, res: Response) => {
  try {
    const settings = await SiteSettings.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Public endpoint to dynamically serve any registered HTML verification file
export const serveVerificationFile = async (req: Request, res: Response) => {
  try {
    const filename = req.params.filename as string;
    const settings = await SiteSettings.findOne();
    if (!settings) {
      return res.status(404).send('Not Found');
    }

    const verificationFile = settings.htmlVerificationFiles.find(
      (f) => f.filename.toLowerCase() === filename.toLowerCase()
    );

    if (!verificationFile) {
      return res.status(404).send('Not Found');
    }

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(verificationFile.content);
  } catch (error: any) {
    res.status(500).send('Internal Server Error');
  }
};

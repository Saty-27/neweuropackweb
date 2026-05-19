import mongoose, { Schema, Document } from 'mongoose';

export interface IHtmlVerificationFile {
  filename: string; // e.g. "google1234abcd.html"
  content: string;  // e.g. "google-site-verification: google1234abcd.html"
}

export interface ISiteSettings extends Document {
  googleSiteVerification?: string;
  bingSiteVerification?: string;
  yahooSiteVerification?: string;
  googleAnalyticsId?: string;
  htmlVerificationFiles: IHtmlVerificationFile[];
}

const HtmlVerificationFileSchema = new Schema({
  filename: { type: String, required: true },
  content: { type: String, required: true }
});

const SiteSettingsSchema: Schema = new Schema({
  googleSiteVerification: { type: String, default: '' },
  bingSiteVerification: { type: String, default: '' },
  yahooSiteVerification: { type: String, default: '' },
  googleAnalyticsId: { type: String, default: '' },
  htmlVerificationFiles: { type: [HtmlVerificationFileSchema], default: [] }
}, { timestamps: true });

export default mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);

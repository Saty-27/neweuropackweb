import mongoose, { Schema, Document } from 'mongoose';

export interface ICaseStudySettings extends Document {
  title: {
    text: string;
    highlightText: string;
  };
  subtitle: string;
  style: {
    title: {
      fontSize: string;
      fontWeight: string;
      fontFamily: string;
      colorPrimary: string;
      colorHighlight: string;
    };
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

const CaseStudySettingsSchema: Schema = new Schema({
  title: {
    text: { type: String, default: 'Industrial Packaging' },
    highlightText: { type: String, default: 'Case Studies' }
  },
  subtitle: { type: String, default: 'Strategic Industrial Success Stories, Engineering Excellence & Operational Success' },
  style: {
    title: {
      fontSize: { type: String, default: '3.5rem' },
      fontWeight: { type: String, default: '800' },
      fontFamily: { type: String, default: 'Poppins' },
      colorPrimary: { type: String, default: '#0f172a' },
      colorHighlight: { type: String, default: '#FF6600' }
    }
  },
  seo: {
    metaTitle: { type: String, default: 'Industrial Success Stories | Europack India' },
    metaDescription: { type: String, default: 'Explore high-impact industrial packaging case studies, machinery export solutions, and engineering excellence by Europack.' },
    keywords: { type: [String], default: ['industrial packaging case study', 'machinery export', 'heavy engineering packaging'] }
  }
}, {
  timestamps: true
});

export default mongoose.model<ICaseStudySettings>('CaseStudySettings', CaseStudySettingsSchema);

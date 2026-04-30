import mongoose, { Schema, Document } from 'mongoose';

export interface IMediaSettings extends Document {
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
    cardTitle: {
      fontSize: string;
      fontWeight: string;
    };
    cardSubtitle: {
      fontSize: string;
    };
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    schema: any;
  };
}

const MediaSettingsSchema: Schema = new Schema({
  title: {
    text: { type: String, default: 'Our Media & Resources' },
    highlightText: { type: String, default: 'Resources' }
  },
  subtitle: { type: String, default: 'Explore Videos, Case Studies & Industrial Documents' },
  style: {
    title: {
      fontSize: { type: String, default: '36px' },
      fontWeight: { type: String, default: '700' },
      fontFamily: { type: String, default: 'Poppins' },
      colorPrimary: { type: String, default: '#000000' },
      colorHighlight: { type: String, default: '#FF6600' }
    },
    cardTitle: {
      fontSize: { type: String, default: '16px' },
      fontWeight: { type: String, default: '600' }
    },
    cardSubtitle: {
      fontSize: { type: String, default: '14px' }
    }
  },
  seo: {
    metaTitle: { type: String, default: 'Packaging Videos & Resources | Europack India' },
    metaDescription: { type: String, default: 'Watch packaging videos and download industrial packaging guides, case studies, and corporate presentations.' },
    keywords: { type: [String], default: ['packaging videos', 'industrial packaging guide', 'wooden pallet video'] },
    schema: { type: Object, default: { "@type": "VideoObject", "name": "Europack Media Hub" } }
  }
}, { timestamps: true });

export default mongoose.model<IMediaSettings>('MediaSettings', MediaSettingsSchema);

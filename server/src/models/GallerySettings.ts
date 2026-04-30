import mongoose, { Schema, Document } from 'mongoose';

export interface IGallerySettings extends Document {
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
    cardDescription: {
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

const GallerySettingsSchema: Schema = new Schema({
  title: {
    text: { type: String, default: 'Engineering' },
    highlightText: { type: String, default: 'Excellence' }
  },
  subtitle: { type: String, default: 'Mission-critical industrial packaging and engineering capabilities across global logistics hubs.' },
  style: {
    title: {
      fontSize: { type: String, default: '5rem' },
      fontWeight: { type: String, default: '900' },
      fontFamily: { type: String, default: 'Inter' },
      colorPrimary: { type: String, default: '#FFFFFF' },
      colorHighlight: { type: String, default: '#FF6600' }
    },
    cardTitle: {
      fontSize: { type: String, default: '16px' },
      fontWeight: { type: String, default: '600' }
    },
    cardDescription: {
      fontSize: { type: String, default: '14px' }
    }
  },
  seo: {
    metaTitle: { type: String, default: 'Packaging Work Gallery | Europack' },
    metaDescription: { type: String, default: 'Explore our industrial packaging projects including wooden pallets, vacuum packing, and export packaging.' },
    keywords: { type: [String], default: ['packaging gallery', 'industrial packaging work', 'wooden pallet projects'] },
    schema: { type: Object, default: { "@type": "ImageGallery", "name": "Europack Work Gallery" } }
  }
}, { timestamps: true });

export default mongoose.model<IGallerySettings>('GallerySettings', GallerySettingsSchema);

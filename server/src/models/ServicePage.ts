import mongoose, { Document, Schema } from 'mongoose';

export interface IServicePage extends Document {
  title: string;
  slug: string;
  hero: {
    title: string;
    subtitle: string;
    image: { url: string; alt: string };
    buttons: Array<{ text: string; action: string; link?: string }>;
  };
  description: {
    heading: string;
    paragraph: string;
  };
  highlights: string[];
  cta: {
    heading: string;
    buttons: Array<{ text: string; action: string; link?: string }>;
  };
  styles: {
    title: { fontSize: string; fontWeight: string; color?: string };
    subtitle: { fontSize: string; fontWeight: string; color?: string };
    paragraph: { fontSize: string; lineHeight: string; color?: string };
    button: { fontSize: string; fontWeight: string; color?: string };
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    schema: any;
  };
  status: 'draft' | 'published';
  visible: boolean;
}

const ServicePageSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  hero: {
    title: { type: String, required: true },
    subtitle: { type: String },
    image: { url: String, alt: String },
    buttons: [{ text: String, action: String, link: String }]
  },
  description: {
    heading: { type: String },
    paragraph: { type: String }
  },
  highlights: [String],
  cta: {
    heading: { type: String },
    buttons: [{ text: String, action: String, link: String }]
  },
  styles: {
    title: { fontSize: { type: String, default: '36px' }, fontWeight: { type: String, default: '700' }, color: String },
    subtitle: { fontSize: { type: String, default: '18px' }, fontWeight: { type: String, default: '500' }, color: String },
    paragraph: { fontSize: { type: String, default: '16px' }, lineHeight: { type: String, default: '1.6' }, color: String },
    button: { fontSize: { type: String, default: '16px' }, fontWeight: { type: String, default: '600' }, color: String }
  },
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: [String],
    schema: { type: Object, default: {} }
  },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  visible: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.model<IServicePage>('ServicePage', ServicePageSchema);

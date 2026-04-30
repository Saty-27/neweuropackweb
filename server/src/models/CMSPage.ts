import mongoose, { Schema, Document } from 'mongoose';

export interface ICMSPage extends Document {
  pageName: string; // e.g. 'Home', 'About'
  content: Record<string, any>; // Flexible JSON storing banners, sections, texts, images
  seoTitle?: string;
  seoDescription?: string;
  isPublished: boolean;
}

const CMSPageSchema: Schema = new Schema({
  pageName: { type: String, required: true, unique: true },
  content: { type: Schema.Types.Mixed, default: {} },
  seoTitle: { type: String },
  seoDescription: { type: String },
  isPublished: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.model<ICMSPage>('CMSPage', CMSPageSchema);

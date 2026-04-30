import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomPage extends Document {
  title: string;
  slug: string;
  content: string; // HTML from Rich Text Editor
  seoTitle?: string;
  seoDescription?: string;
  isPublished: boolean;
}

const CustomPageSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  seoTitle: { type: String },
  seoDescription: { type: String },
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<ICustomPage>('CustomPage', CustomPageSchema);

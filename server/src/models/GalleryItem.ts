import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryItem extends Document {
  title: string;
  description: string;
  type: 'image' | 'video';
  videoId?: string;
  videoUrl?: string;
  image: {
    url: string;
    alt: string;
  };
  category: string;
  tags: string[];
  link?: string;
  seo: {
    title?: string;
    description?: string;
  };
  visible: boolean;
  order: number;
}

const GalleryItemSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['image', 'video'], default: 'image' },
  videoId: { type: String, default: '' },
  videoUrl: { type: String, default: '' },
  image: {
    url: { type: String, required: true },
    alt: { type: String, default: '' }
  },
  category: { type: String, required: true, default: 'General' },
  tags: { type: [String], default: [] },
  link: { type: String, default: '' },
  seo: {
    title: { type: String },
    description: { type: String }
  },
  visible: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model<IGalleryItem>('GalleryItem', GalleryItemSchema);

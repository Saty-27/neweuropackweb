import mongoose, { Schema, Document } from 'mongoose';

export interface IMediaItem extends Document {
  type: 'video' | 'file' | 'image';
  title: string;
  subtitle?: string;
  description?: string;
  thumbnail: {
    url: string;
    alt: string;
  };
  video?: {
    youtubeUrl: string;
    embedId: string;
  };
  file?: {
    url: string;
    name: string;
    size: string;
    format: string;
  };
  category: string;
  tags: string[];
  aiData?: {
    summary: string;
    topics: string[];
    useCases: string[];
  };
  visible: boolean;
  order: number;
}

const MediaItemSchema: Schema = new Schema({
  type: { type: String, enum: ['video', 'file', 'image'], required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  description: { type: String, default: '' },
  thumbnail: {
    url: { type: String, required: true },
    alt: { type: String, default: '' }
  },
  video: {
    youtubeUrl: { type: String },
    embedId: { type: String }
  },
  file: {
    url: { type: String },
    name: { type: String },
    size: { type: String },
    format: { type: String }
  },
  category: { type: String, required: true, default: 'Videos' },
  tags: { type: [String], default: [] },
  aiData: {
    summary: { type: String, default: '' },
    topics: { type: [String], default: [] },
    useCases: { type: [String], default: [] }
  },
  visible: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model<IMediaItem>('MediaItem', MediaItemSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IIndustry extends Document {
  title: string;
  slug: string;
  image: {
    url: string;
    alt: string;
  };
  description: string;
  points?: string[]; // Optional bullet points/highlights
  specs?: {
    key: string;
    value: string;
  }[]; // Optional Technical Table
  visible: boolean;
  order: number;
}

const IndustrySchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: {
    url: { type: String, required: true },
    alt: { type: String, default: '' }
  },
  description: { type: String, required: true },
  points: { type: [String], default: [] },
  specs: [{
    key: { type: String },
    value: { type: String }
  }],
  visible: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model<IIndustry>('Industry', IndustrySchema);

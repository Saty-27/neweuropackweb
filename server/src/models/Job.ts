import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  fullDescription: string;
  requirements: string[];
  active: boolean;
  order: number;
}

const JobSchema: Schema = new Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true, default: 'Full-Time' },
  experience: { type: String, required: true },
  description: { type: String, required: true },
  fullDescription: { type: String, required: true },
  requirements: { type: [String], default: [] },
  active: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.model<IJob>('Job', JobSchema);

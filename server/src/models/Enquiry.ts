import mongoose, { Document, Schema } from 'mongoose';

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  location: string;
  service: string;
  message?: string;
  status: 'New' | 'Contacted' | 'Converted' | 'Lost';
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String },
  location: { type: String, required: true },
  service: { type: String, required: true, default: 'General Inquiry' },
  message: { type: String },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Converted', 'Lost'],
    default: 'New' 
  }
}, {
  timestamps: true
});

export default mongoose.model<IEnquiry>('Enquiry', EnquirySchema);

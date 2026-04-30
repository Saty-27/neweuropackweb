import mongoose, { Document, Schema } from 'mongoose';

export interface IQuote extends Document {
  name: string;
  company?: string;
  email: string;
  phone: string;
  productType?: string;
  message: string;
  fileUrl?: string;
  status: 'New' | 'In Progress' | 'Converted' | 'Closed';
  createdAt: Date;
  updatedAt: Date;
}

const QuoteSchema: Schema = new Schema({
  name: { type: String, required: true },
  company: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  productType: { type: String },
  message: { type: String, required: true },
  fileUrl: { type: String },
  status: { 
    type: String, 
    enum: ['New', 'In Progress', 'Converted', 'Closed'],
    default: 'New' 
  }
}, {
  timestamps: true
});

export default mongoose.model<IQuote>('Quote', QuoteSchema);

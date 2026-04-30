import mongoose, { Document, Schema } from 'mongoose';

export interface IContactForm extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  attachment?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

const ContactFormSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  attachment: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, {
  timestamps: true
});

export default mongoose.model<IContactForm>('ContactForm', ContactFormSchema);

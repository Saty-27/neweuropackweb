import mongoose, { Schema, Document } from 'mongoose';

export interface IFAQSettings extends Document {
  page: string;
  layoutType: 'accordion' | 'card' | 'simple';
  designMode: 'graphic' | 'minimal';
  title: string;
  subtitle: string;
  backgroundImage: string;
  overlayColor: string;
  overlayOpacity: number;
  backgroundColor: string;
  cardColor: string;
  textColor: string;
  titleColor: string;
  titleFontSize: string;
  questionFontSize: string;
  answerFontSize: string;
}

const FAQSettingsSchema: Schema = new Schema({
  page: { type: String, required: true, unique: true },
  layoutType: { type: String, enum: ['accordion', 'card', 'simple'], default: 'accordion' },
  designMode: { type: String, enum: ['graphic', 'minimal'], default: 'minimal' },
  title: { type: String, default: 'Frequently Asked Questions' },
  subtitle: { type: String },
  backgroundImage: { type: String },
  overlayColor: { type: String, default: '#000000' },
  overlayOpacity: { type: Number, default: 50 },
  backgroundColor: { type: String, default: '#ffffff' },
  cardColor: { type: String, default: '#f7f6f5' },
  textColor: { type: String, default: '#000000' },
  titleColor: { type: String, default: '#000000' },
  titleFontSize: { type: String, default: '2rem' },
  questionFontSize: { type: String, default: '1.2rem' },
  answerFontSize: { type: String, default: '1rem' }
}, { timestamps: true });

export default mongoose.model<IFAQSettings>('FAQSettings', FAQSettingsSchema);

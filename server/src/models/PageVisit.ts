import mongoose, { Schema, Document } from 'mongoose';

export interface IPageVisit extends Document {
  url: string;
  referrer: string;
  userAgent: string;
  ip: string;
  sessionId: string;
  timestamp: Date;
}

const PageVisitSchema: Schema = new Schema({
  url: { type: String, required: true },
  referrer: { type: String },
  userAgent: { type: String },
  ip: { type: String },
  sessionId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Index for analytics queries
PageVisitSchema.index({ url: 1, timestamp: -1 });
PageVisitSchema.index({ sessionId: 1 });

export default mongoose.model<IPageVisit>('PageVisit', PageVisitSchema);

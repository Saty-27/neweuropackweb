import mongoose, { Schema, Document } from 'mongoose';

export interface IActivityLog extends Document {
  user: mongoose.Types.ObjectId;
  action: 'create' | 'update' | 'delete' | 'view' | 'login' | 'logout' | 'upload';
  section: string;
  itemId?: string;
  description: string;
  ipAddress?: string;
  userAgent?: string;
}

const ActivityLogSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { 
    type: String, 
    enum: ['create', 'update', 'delete', 'view', 'login', 'logout', 'upload'],
    required: true 
  },
  section: { type: String, required: true },
  itemId: { type: String }, // Optional: reference to the object affected
  description: { type: String, required: true },
  ipAddress: { type: String },
  userAgent: { type: String }
}, {
  timestamps: true
});

// Index for high-performance retrieval in the Monitoring UI
ActivityLogSchema.index({ user: 1, action: 1, section: 1, createdAt: -1 });

export default mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);

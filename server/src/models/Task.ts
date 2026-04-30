import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  assignedTo: mongoose.Types.ObjectId;
  assignedBy: mongoose.Types.ObjectId;
  deadline: Date;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Overdue';
  priority: 'High' | 'Medium' | 'Low';
  attachments: string[];
  comments: { user: mongoose.Types.ObjectId, text: string, createdAt: Date }[];
  isOverdueNotified: boolean;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  deadline: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['Not Started', 'In Progress', 'Completed', 'Overdue'], 
    default: 'Not Started' 
  },
  priority: { 
    type: String, 
    enum: ['High', 'Medium', 'Low'], 
    default: 'Medium' 
  },
  attachments: { type: [String], default: [] },
  comments: [{ 
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  isOverdueNotified: { type: Boolean, default: false }
}, {
  timestamps: true
});

// Middleware to calculate overdue status on find/save? Or maybe a cron job is better.
// For now, simple getter or pre-save won't auto-update if un-interacted. 
// We will handle "Overdue" status in cron jobs or API fetches.

export default mongoose.model<ITask>('Task', TaskSchema);

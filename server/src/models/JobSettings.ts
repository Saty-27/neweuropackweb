import mongoose, { Schema, Document } from 'mongoose';

export interface IJobSettings extends Document {
  visible: boolean;
}

const JobSettingsSchema: Schema = new Schema({
  visible: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.model<IJobSettings>('JobSettings', JobSettingsSchema);

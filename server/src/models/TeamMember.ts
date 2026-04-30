import mongoose, { Document, Schema } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  designation: string;
  shortTag?: string;
  image: {
    url: string;
    alt: string;
  };
  description: string;
  contact: {
    email?: string;
    linkedin?: string;
  };
  style: {
    name?: { fontSize?: string; fontWeight?: string; color?: string };
    designation?: { fontSize?: string; fontWeight?: string; color?: string };
    description?: { fontSize?: string; lineHeight?: string; color?: string };
  };
  order: number;
  visible: boolean;
  featured: boolean;
  department?: string;
}

const TeamMemberSchema: Schema = new Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  shortTag: { type: String },
  image: {
    url: { type: String, required: true },
    alt: { type: String }
  },
  description: { type: String },
  contact: {
    email: { type: String },
    linkedin: { type: String }
  },
  style: {
    name: { fontSize: String, fontWeight: String, color: String },
    designation: { fontSize: String, fontWeight: String, color: String },
    description: { fontSize: String, lineHeight: String, color: String }
  },
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  department: { type: String }
}, {
  timestamps: true
});

export default mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);

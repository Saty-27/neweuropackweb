import mongoose, { Document, Schema } from 'mongoose';

export interface ITeamSettings extends Document {
  title: string;
  subtitle: string;
  layout: 'grid' | 'carousel';
  globalTypography: {
    title?: { fontSize?: string; fontWeight?: string; color?: string };
    subtitle?: { fontSize?: string; fontWeight?: string; color?: string };
    memberName?: { fontSize?: string; fontWeight?: string; color?: string };
    designation?: { fontSize?: string; fontWeight?: string; color?: string };
    description?: { fontSize?: string; lineHeight?: string; color?: string };
  };
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
    schema?: any;
  };
  visible?: boolean;
}

const TeamSettingsSchema: Schema = new Schema({
  title: { type: String, default: 'Our Team' },
  subtitle: { type: String, default: 'Meet the Experts Behind Europack' },
  layout: { type: String, enum: ['grid', 'carousel'], default: 'grid' },
  globalTypography: {
    title: { fontSize: { type: String, default: '32px' }, fontWeight: { type: String, default: '700' }, color: { type: String, default: '#1e293b' } },
    subtitle: { fontSize: { type: String, default: '18px' }, fontWeight: { type: String, default: '500' }, color: { type: String, default: '#64748b' } },
    memberName: { fontSize: { type: String, default: '18px' }, fontWeight: { type: String, default: '600' }, color: { type: String, default: '#0f172a' } },
    designation: { fontSize: { type: String, default: '14px' }, fontWeight: { type: String, default: '500' }, color: { type: String, default: '#FF6600' } },
    description: { fontSize: { type: String, default: '14px' }, lineHeight: { type: String, default: '1.6' }, color: { type: String, default: '#475569' } }
  },
  seo: {
    title: { type: String },
    description: { type: String },
    keywords: { type: [String], default: [] },
    schema: { type: Object, default: {} }
  },
  visible: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.model<ITeamSettings>('TeamSettings', TeamSettingsSchema);

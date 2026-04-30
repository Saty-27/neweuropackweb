import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface ISectionPermissions {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

export interface IPermissionMatrix {
  products: ISectionPermissions;
  blogs: ISectionPermissions;
  gallery: ISectionPermissions;
  media: ISectionPermissions;
  caseStudies: ISectionPermissions;
  industries: ISectionPermissions;
  services: ISectionPermissions;
  team: ISectionPermissions;
  faqs: ISectionPermissions;
  enquiries: ISectionPermissions;
  quotes: ISectionPermissions;
  leads: ISectionPermissions;
  settings: ISectionPermissions;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: 'Super Admin' | 'Admin' | 'Editor' | 'Viewer';
  permissions: IPermissionMatrix;
  status: 'active' | 'inactive';
  lastLogin?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const SectionPermissionSchema = {
  view: { type: Boolean, default: false },
  create: { type: Boolean, default: false },
  edit: { type: Boolean, default: false },
  delete: { type: Boolean, default: false }
};

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  role: { 
    type: String, 
    enum: ['Super Admin', 'Admin', 'Editor', 'Viewer'], 
    default: 'Viewer' 
  },
  permissions: {
    products: { type: SectionPermissionSchema, default: () => ({ view: true, create: false, edit: false, delete: false }) },
    blogs: { type: SectionPermissionSchema, default: () => ({ view: true, create: false, edit: false, delete: false }) },
    gallery: { type: SectionPermissionSchema, default: () => ({ view: true, create: false, edit: false, delete: false }) },
    media: { type: SectionPermissionSchema, default: () => ({ view: true, create: false, edit: false, delete: false }) },
    caseStudies: { type: SectionPermissionSchema, default: () => ({ view: true, create: false, edit: false, delete: false }) },
    industries: { type: SectionPermissionSchema, default: () => ({ view: true, create: false, edit: false, delete: false }) },
    services: { type: SectionPermissionSchema, default: () => ({ view: true, create: false, edit: false, delete: false }) },
    team: { type: SectionPermissionSchema, default: () => ({ view: true, create: false, edit: false, delete: false }) },
    faqs: { type: SectionPermissionSchema, default: () => ({ view: true, create: false, edit: false, delete: false }) },
    enquiries: { type: SectionPermissionSchema, default: () => ({ view: true, create: false, edit: false, delete: false }) },
    quotes: { type: SectionPermissionSchema, default: () => ({ view: true, create: false, edit: false, delete: false }) },
    leads: { type: SectionPermissionSchema, default: () => ({ view: true, create: false, edit: false, delete: false }) },
    settings: { type: SectionPermissionSchema, default: () => ({ view: false, create: false, edit: false, delete: false }) }
  },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  lastLogin: { type: Date }
}, {
  timestamps: true
});

UserSchema.pre('save', async function(this: IUser) {
  if (!this.isModified('password') || !this.password) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
});

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  content: string; // Rich text content for the product page
  image: string;
  gallery: string[]; // Multiple images support
  slug: string;
  features: string[];
  specifications: { key: string; value: string }[];
  category: string;
  parentProduct: mongoose.Types.ObjectId | null; // Self-reference for sub-products
  active: boolean;
  isFeatured: boolean;
  order: number;
}

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  content: { type: String },
  image: { type: String, required: true },
  gallery: { type: [String], default: [] },
  category: { 
    type: String, 
    default: 'General'
  },
  parentProduct: { type: Schema.Types.ObjectId, ref: 'Product', default: null },
  features: { type: [String], default: [] },
  specifications: [{
    key: { type: String },
    value: { type: String }
  }],
  active: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.model<IProduct>('Product', ProductSchema);


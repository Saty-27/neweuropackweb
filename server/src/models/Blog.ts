import mongoose, { Schema, Document } from 'mongoose';

const ContentBlockSchema = new Schema({
  id: { type: String },
  type: { 
    type: String, 
    enum: ['heading', 'paragraph', 'image', 'list', 'cta', 'link', 'embed', 'divider'],
    required: true 
  },
  content: { type: Schema.Types.Mixed, default: {} },
  style: { type: Schema.Types.Mixed, default: {} },
  order: { type: Number, default: 0 }
}, { _id: false });

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  slug: { type: String, required: true, unique: true },
  
  heroImage: { type: String },
  altText: { type: String },
  
  category: { type: String, required: true },
  tags: { type: [String], default: [] },
  
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  author: { type: String, default: 'Europack' },
  
  typography: {
    title: {
      fontSize: { type: String, default: '36px' },
      fontWeight: { type: String, default: '700' },
      fontFamily: { type: String, default: 'Poppins' },
      color: { type: String, default: '#1e293b' }
    },
    subtitle: {
      fontSize: { type: String, default: '18px' },
      fontWeight: { type: String, default: '500' },
      fontFamily: { type: String, default: 'Poppins' },
      color: { type: String, default: '#64748b' }
    },
    paragraph: {
      fontSize: { type: String, default: '16px' },
      lineHeight: { type: String, default: '1.6' },
      fontFamily: { type: String, default: 'Inter' },
      color: { type: String, default: '#334155' }
    }
  },

  contentBlocks: [ContentBlockSchema],

  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: { type: [String], default: [] },
    aiSummary: { type: String },
    faqs: [{
      question: String,
      answer: String
    }],
    schema: { type: Schema.Types.Mixed, default: {} }
  },

  analytics: {
    views: { type: Number, default: 0 },
    readTime: { type: Number, default: 0 } // Estimated in minutes
  },

  relations: {
    relatedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    relatedBlogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }]
  }
}, {
  timestamps: true
});

export interface IBlog extends Document {
  title: string;
  subtitle?: string;
  slug: string;
  heroImage?: string;
  altText?: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  author: string;
  typography: any;
  contentBlocks: any[];
  seo: any;
  analytics: {
    views: number;
    readTime: number;
  };
  relations: {
    relatedProducts: mongoose.Types.ObjectId[];
    relatedBlogs: mongoose.Types.ObjectId[];
  };
}

export default mongoose.model<IBlog>('Blog', BlogSchema);

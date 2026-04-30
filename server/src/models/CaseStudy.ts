import mongoose, { Schema, Document } from 'mongoose';

const CaseStudySectionSchema = new Schema({
  type: { 
    type: String, 
    enum: ['paragraph', 'heading', 'image', 'process_flow', 'table', 'html', 'results', 'cta'],
    required: true 
  },
  content: { type: Schema.Types.Mixed }, // String for paragraph/html/heading
  url: { type: String }, // For images
  alt: { type: String }, // For images
  level: { type: String, enum: ['h1', 'h2', 'h3'], default: 'h2' }, // For headings
  steps: [String], // For process_flow
  points: [String], // For results
  data: [{ key: String, value: String }], // For tables
  cta: {
    heading: String,
    buttonText: String,
    link: String
  }
}, { _id: true });

export interface ICaseStudy extends Document {
  title: string;
  subtitle: string;
  slug: string;
  heroVideo: {
    youtubeUrl: string;
    embedId: string;
    thumbnail: string;
    title: string;
  };
  mainContent: string;
  sections: any[];
  productsUsed: mongoose.Types.ObjectId[];
  style: {
    title: { fontSize: string, fontWeight: string, color: string };
    subtitle: { fontSize: string, color: string };
    paragraph: { fontSize: string, color: string };
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    schema: any;
  };
  aiData: {
    summary: string;
    problem: string;
    solution: string;
    outcome: string;
  };
  visible: boolean;
  order: number;
}

const CaseStudySchema: Schema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  slug: { type: String, required: true, unique: true },
  heroVideo: {
    youtubeUrl: { type: String },
    embedId: { type: String },
    thumbnail: { type: String },
    title: { type: String }
  },
  mainContent: { type: String, default: '' },
  sections: [CaseStudySectionSchema],
  productsUsed: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  style: {
    title: {
      fontSize: { type: String, default: '48px' },
      fontWeight: { type: String, default: '900' },
      color: { type: String, default: '#0f172a' }
    },
    subtitle: {
      fontSize: { type: String, default: '18px' },
      color: { type: String, default: '#64748b' }
    },
    paragraph: {
      fontSize: { type: String, default: '16px' },
      color: { type: String, default: '#334155' }
    }
  },
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: { type: [String], default: [] },
    schema: { type: Schema.Types.Mixed, default: {} }
  },
  aiData: {
    summary: { type: String },
    problem: { type: String },
    solution: { type: String },
    outcome: { type: String }
  },
  visible: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

// Middleware to auto-generate slug is usually handled in controller, 
// but added index for performance.
CaseStudySchema.index({ slug: 1 });

export default mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema);

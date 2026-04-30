"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const CaseStudySectionSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ['paragraph', 'heading', 'image', 'process_flow', 'table', 'html', 'results', 'cta'],
        required: true
    },
    content: { type: mongoose_1.Schema.Types.Mixed }, // String for paragraph/html/heading
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
const CaseStudySchema = new mongoose_1.Schema({
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
    productsUsed: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' }],
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
        schema: { type: mongoose_1.Schema.Types.Mixed, default: {} }
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
exports.default = mongoose_1.default.model('CaseStudy', CaseStudySchema);

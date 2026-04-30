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
const ContentBlockSchema = new mongoose_1.Schema({
    id: { type: String },
    type: {
        type: String,
        enum: ['heading', 'paragraph', 'image', 'list', 'cta', 'link', 'embed', 'divider'],
        required: true
    },
    content: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    style: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    order: { type: Number, default: 0 }
}, { _id: false });
const BlogSchema = new mongoose_1.Schema({
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
        schema: { type: mongoose_1.Schema.Types.Mixed, default: {} }
    },
    analytics: {
        views: { type: Number, default: 0 },
        readTime: { type: Number, default: 0 } // Estimated in minutes
    },
    relations: {
        relatedProducts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' }],
        relatedBlogs: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Blog' }]
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Blog', BlogSchema);

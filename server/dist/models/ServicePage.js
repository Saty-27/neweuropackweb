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
const ServicePageSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    hero: {
        title: { type: String, required: true },
        subtitle: { type: String },
        image: { url: String, alt: String },
        buttons: [{ text: String, action: String, link: String }]
    },
    description: {
        heading: { type: String },
        paragraph: { type: String }
    },
    highlights: [String],
    cta: {
        heading: { type: String },
        buttons: [{ text: String, action: String, link: String }]
    },
    styles: {
        title: { fontSize: { type: String, default: '36px' }, fontWeight: { type: String, default: '700' }, color: String },
        subtitle: { fontSize: { type: String, default: '18px' }, fontWeight: { type: String, default: '500' }, color: String },
        paragraph: { fontSize: { type: String, default: '16px' }, lineHeight: { type: String, default: '1.6' }, color: String },
        button: { fontSize: { type: String, default: '16px' }, fontWeight: { type: String, default: '600' }, color: String }
    },
    seo: {
        metaTitle: { type: String },
        metaDescription: { type: String },
        keywords: [String],
        schema: { type: Object, default: {} }
    },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    visible: { type: Boolean, default: true }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('ServicePage', ServicePageSchema);

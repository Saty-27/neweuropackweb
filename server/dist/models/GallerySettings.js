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
const GallerySettingsSchema = new mongoose_1.Schema({
    title: {
        text: { type: String, default: 'Engineering' },
        highlightText: { type: String, default: 'Excellence' }
    },
    subtitle: { type: String, default: 'Mission-critical industrial packaging and engineering capabilities across global logistics hubs.' },
    style: {
        title: {
            fontSize: { type: String, default: '5rem' },
            fontWeight: { type: String, default: '900' },
            fontFamily: { type: String, default: 'Inter' },
            colorPrimary: { type: String, default: '#FFFFFF' },
            colorHighlight: { type: String, default: '#FF6600' }
        },
        cardTitle: {
            fontSize: { type: String, default: '16px' },
            fontWeight: { type: String, default: '600' }
        },
        cardDescription: {
            fontSize: { type: String, default: '14px' }
        }
    },
    seo: {
        metaTitle: { type: String, default: 'Packaging Work Gallery | Europack' },
        metaDescription: { type: String, default: 'Explore our industrial packaging projects including wooden pallets, vacuum packing, and export packaging.' },
        keywords: { type: [String], default: ['packaging gallery', 'industrial packaging work', 'wooden pallet projects'] },
        schema: { type: Object, default: { "@type": "ImageGallery", "name": "Europack Work Gallery" } }
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('GallerySettings', GallerySettingsSchema);

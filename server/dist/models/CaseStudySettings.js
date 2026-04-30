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
const CaseStudySettingsSchema = new mongoose_1.Schema({
    title: {
        text: { type: String, default: 'Industrial Packaging' },
        highlightText: { type: String, default: 'Case Studies' }
    },
    subtitle: { type: String, default: 'Strategic Industrial Success Stories, Engineering Excellence & Operational Success' },
    style: {
        title: {
            fontSize: { type: String, default: '3.5rem' },
            fontWeight: { type: String, default: '800' },
            fontFamily: { type: String, default: 'Poppins' },
            colorPrimary: { type: String, default: '#0f172a' },
            colorHighlight: { type: String, default: '#FF6600' }
        }
    },
    seo: {
        metaTitle: { type: String, default: 'Industrial Success Stories | Europack India' },
        metaDescription: { type: String, default: 'Explore high-impact industrial packaging case studies, machinery export solutions, and engineering excellence by Europack.' },
        keywords: { type: [String], default: ['industrial packaging case study', 'machinery export', 'heavy engineering packaging'] }
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('CaseStudySettings', CaseStudySettingsSchema);

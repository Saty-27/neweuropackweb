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
const TeamSettingsSchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.default.model('TeamSettings', TeamSettingsSchema);

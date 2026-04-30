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
const FAQSettingsSchema = new mongoose_1.Schema({
    page: { type: String, required: true, unique: true },
    layoutType: { type: String, enum: ['accordion', 'card', 'simple'], default: 'accordion' },
    designMode: { type: String, enum: ['graphic', 'minimal'], default: 'minimal' },
    title: { type: String, default: 'Frequently Asked Questions' },
    subtitle: { type: String },
    backgroundImage: { type: String },
    overlayColor: { type: String, default: '#000000' },
    overlayOpacity: { type: Number, default: 50 },
    backgroundColor: { type: String, default: '#ffffff' },
    cardColor: { type: String, default: '#f7f6f5' },
    textColor: { type: String, default: '#000000' },
    titleColor: { type: String, default: '#000000' },
    titleFontSize: { type: String, default: '2rem' },
    questionFontSize: { type: String, default: '1.2rem' },
    answerFontSize: { type: String, default: '1rem' }
}, { timestamps: true });
exports.default = mongoose_1.default.model('FAQSettings', FAQSettingsSchema);

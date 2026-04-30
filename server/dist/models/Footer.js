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
const FooterSchema = new mongoose_1.Schema({
    logo: { type: String },
    logoAlt: { type: String, default: 'Europack' },
    tagline: { type: String, default: 'Technical Packing Solutions' },
    description: { type: String },
    typography: {
        fontFamily: { type: String, default: 'Poppins' },
        fontSize: { type: String, default: '14px' },
        fontWeight: { type: String, default: '400' },
        color: { type: String, default: '#ffffff' },
        letterSpacing: { type: String, default: '0px' },
        headingColor: { type: String, default: '#FF6600' }
    },
    quickLinks: [{
            name: { type: String },
            link: { type: String }
        }],
    socialLinks: [{
            name: { type: String },
            icon: { type: String },
            link: { type: String }
        }],
    productsHeader: { type: String, default: 'Pallet Solutions' },
    servicesHeader: { type: String, default: 'Industrial Services' },
    industriesHeader: { type: String, default: 'Industries We Serve' },
    contact: {
        headOffice: {
            title: { type: String, default: 'Head Office — Europack' },
            address: { type: String },
            phones: [{ number: { type: String }, label: { type: String } }],
            emails: [{ address: { type: String }, label: { type: String } }]
        },
        factories: [{
                name: { type: String },
                location: { type: String },
                gst: { type: String }
            }]
    },
    trustIndicators: {
        experienceYears: { type: String, default: '33+' },
        clientCount: { type: String, default: '1000+' },
        specialty: { type: String, default: 'Export Specialists' }
    },
    ctaStrip: {
        show: { type: Boolean, default: true },
        heading: { type: String, default: 'Ready to discuss your packaging needs?' },
        subtext: { type: String, default: 'Get a customised quote within 24 hours.' },
        buttonText: { type: String, default: 'GET YOUR FREE QUOTE' },
        buttonLink: { type: String, default: '/contact' }
    },
    bottom: {
        copyright: { type: String },
        links: [{
                name: { type: String },
                link: { type: String }
            }]
    },
    backgroundColor: { type: String, default: '#0B0F19' },
    backgroundGradient: { type: String },
    backgroundImage: { type: String },
    showProducts: { type: Boolean, default: true },
    showServices: { type: Boolean, default: true },
    showIndustries: { type: Boolean, default: true },
    showBottom: { type: Boolean, default: true }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Footer', FooterSchema);

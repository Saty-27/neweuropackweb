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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Homepage_1 = __importDefault(require("../models/Homepage"));
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv.config({ path: path_1.default.join(__dirname, '../../.env') });
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/europack';
const alignedBanners = [
    {
        desktopImage: '/images/banners/banner_action.png',
        tabletImage: '/images/banners/banner_action.png',
        mobileImage: '/images/banners/banner_action.png',
        imageAlt: 'Packaging in Action',
        heading: 'We Don’t Just Move Products. We Protect Them.',
        subheading: 'Global standards in wooden export crating and industrial machinery protection.',
        buttons: [
            { text: 'REQUEST QUOTE →', link: '/contact' },
            { text: 'OUR SOLUTIONS', link: '/solutions' }
        ],
        order: 1,
        status: true
    },
    {
        desktopImage: '/images/banners/2.png',
        tabletImage: '/images/banners/2.png',
        mobileImage: '/images/banners/2.png',
        imageAlt: 'Wooden Pallets Scale',
        heading: 'Engineered Pallets Built for Global Load.',
        subheading: 'Organised scale and volume to handle your largest logistics requirements.',
        buttons: [
            { text: 'VIEW CATALOG →', link: '/products' },
            { text: 'BULK ENQUIRY', link: '/contact' }
        ],
        order: 2,
        status: true
    },
    {
        desktopImage: '/images/banners/3.png',
        tabletImage: '/images/banners/3.png',
        mobileImage: '/images/banners/3.png',
        imageAlt: 'Export Packaging Shipping',
        heading: 'Export-Ready Packaging. Zero Risk Delivery.',
        subheading: 'Connecting packaging excellence to international shipping yards.',
        buttons: [
            { text: 'GET QUOTE →', link: '/contact' },
            { text: 'LOAD SAFETY', link: '/solutions' }
        ],
        order: 3,
        status: true
    },
    {
        desktopImage: '/images/banners/4.png',
        tabletImage: '/images/banners/4.png',
        mobileImage: '/images/banners/4.png',
        imageAlt: 'Full Service Packaging Solution',
        heading: 'Complete Industrial Packaging Solutions Under One Roof.',
        subheading: 'From vacuum wrapping to heavy-duty lashing, we handle the entire process.',
        buttons: [
            { text: 'EXPLORE SERVICES →', link: '/services' },
            { text: 'CONTACT EXPERTS', link: '/contact' }
        ],
        order: 4,
        status: true
    }
];
async function alignMeaning() {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        const homepage = await Homepage_1.default.findOne({ 'seo.slug': 'home' });
        if (homepage) {
            homepage.banners = alignedBanners;
            await homepage.save();
            console.log('✅ Banner Copy Aligned to "Meaning > Aesthetics" logic.');
        }
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}
alignMeaning();

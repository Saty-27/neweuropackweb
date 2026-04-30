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
const mainBanner = {
    desktopImage: '/images/banners/banner_main.png',
    tabletImage: '/images/banners/banner_main.png',
    mobileImage: '/images/banners/banner_main.png',
    imageAlt: 'India’s Trusted Industrial Packaging Experts',
    heading: 'India’s Trusted Industrial Packaging Experts',
    subheading: 'Global standards in wooden export crating and industrial machinery protection.',
    buttons: [
        { text: 'VIEW SOLUTIONS →', link: '/solutions' },
        { text: 'REQUEST QUOTE', link: '/contact' }
    ],
    order: 1,
    status: true
};
async function updateMainBanner() {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        const homepage = await Homepage_1.default.findOne({ 'seo.slug': 'home' });
        if (homepage) {
            // We update the first banner in the array
            if (homepage.banners && homepage.banners.length > 0) {
                homepage.banners[0] = mainBanner;
            }
            else {
                homepage.banners = [mainBanner];
            }
            await homepage.save();
            console.log('✅ Main Hero Banner updated with user image and new title.');
        }
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}
updateMainBanner();

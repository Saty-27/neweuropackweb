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
const Product_1 = __importDefault(require("../models/Product"));
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv.config({ path: path_1.default.join(__dirname, '../../.env') });
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/europack';
async function updatePalletImage() {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        // Update wooden pallet category/products in DB
        const result = await Product_1.default.updateMany({ title: { $regex: /Two Way Pallet/i } }, { $set: { image: '/images/products/two-way-pallets.jpeg' } });
        console.log(`✅ Updated ${result.modifiedCount} Two Way Pallet products.`);
        const result4 = await Product_1.default.updateMany({ title: { $regex: /Four Way Pallet/i } }, { $set: { image: '/images/products/four-way-pallets.webp' } });
        console.log(`✅ Updated ${result4.modifiedCount} Four Way Pallet products.`);
        const resultHW = await Product_1.default.updateMany({ title: { $regex: /Hardwood Pallet/i } }, { $set: { image: '/images/products/hardwood-pallets.jpg' } });
        console.log(`✅ Updated ${resultHW.modifiedCount} Hardwood Pallet products.`);
        // Also check for category main image
        const catResult = await Product_1.default.updateMany({ category: 'Pallet Solutions', title: 'Wooden Pallets' }, { $set: { image: '/images/products/two-way-pallets.jpeg' } });
        console.log(`✅ Updated ${catResult.modifiedCount} categories in database.`);
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}
updatePalletImage();

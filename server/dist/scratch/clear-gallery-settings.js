"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const GallerySettings_1 = __importDefault(require("../models/GallerySettings"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const run = async () => {
    await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/europack');
    await GallerySettings_1.default.deleteMany({});
    console.log('Gallery Settings cleared');
    process.exit(0);
};
run();

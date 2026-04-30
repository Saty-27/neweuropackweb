"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Blog_1 = __importDefault(require("../models/Blog"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/europack';
const listBlogs = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        const blogs = await Blog_1.default.find();
        console.log('Total Blogs in DB:', blogs.length);
        blogs.forEach(b => {
            console.log(`- ${b.title} (${b.slug}) | Blocks: ${b.contentBlocks.length}`);
        });
        process.exit(0);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
listBlogs();

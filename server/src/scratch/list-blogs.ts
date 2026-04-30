import mongoose from 'mongoose';
import Blog from '../models/Blog';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/europack';

const listBlogs = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    const blogs = await Blog.find();
    console.log('Total Blogs in DB:', blogs.length);
    blogs.forEach(b => {
      console.log(`- ${b.title} (${b.slug}) | Blocks: ${b.contentBlocks.length}`);
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

listBlogs();

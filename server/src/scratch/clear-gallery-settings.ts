import mongoose from 'mongoose';
import GallerySettings from '../models/GallerySettings';
import dotenv from 'dotenv';
dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/europack');
  await GallerySettings.deleteMany({});
  console.log('Gallery Settings cleared');
  process.exit(0);
};
run();

import mongoose from 'mongoose';
import Homepage from '../models/Homepage';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

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
    await mongoose.connect(MONGO_URI);
    const homepage = await Homepage.findOne({ 'seo.slug': 'home' });
    if (homepage) {
      // We update the first banner in the array
      if (homepage.banners && homepage.banners.length > 0) {
        homepage.banners[0] = mainBanner;
      } else {
        homepage.banners = [mainBanner];
      }
      await homepage.save();
      console.log('✅ Main Hero Banner updated with user image and new title.');
    }
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updateMainBanner();

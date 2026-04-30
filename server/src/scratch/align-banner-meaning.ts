import mongoose from 'mongoose';
import Homepage from '../models/Homepage';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

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
    await mongoose.connect(MONGO_URI);
    const homepage = await Homepage.findOne({ 'seo.slug': 'home' });
    if (homepage) {
      homepage.banners = alignedBanners;
      await homepage.save();
      console.log('✅ Banner Copy Aligned to "Meaning > Aesthetics" logic.');
    }
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

alignMeaning();

import mongoose from 'mongoose';
import GalleryItem from '../models/GalleryItem';
import GallerySettings from '../models/GallerySettings';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/europack';

const seedGallery = async () => {
  try {
    console.log(`Connecting to ${MONGO_URI}...`);
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');

    // 1. Settings update
    await GallerySettings.deleteMany({});
    await GallerySettings.create({
      title: { text: 'Industrial', highlightText: 'Portfolio' },
      subtitle: 'Strategic industrial packaging assets engineered for precision, protection, and performance.',
      style: {
        title: { fontSize: '5.5rem', fontWeight: '900', fontFamily: 'Inter', colorPrimary: '#FFFFFF', colorHighlight: '#FF6600' }
      }
    });

    // 2. Clear and Seed ALL Local Assets
    await GalleryItem.deleteMany({});
    
    const items = [
      // VIDEOS
      {
        title: 'Primary Operations Tour',
        description: 'Detailed look at our main industrial packing operations.',
        type: 'video',
        videoUrl: 'images/gallery/WhatsApp Video 2026-04-28 at 14.27.53.mp4',
        image: { url: 'images/gallery/ExportPacking.webp', alt: 'Operations' },
        category: 'General', visible: true, order: 0
      },
      {
        title: 'Mobile Team Packing',
        description: 'Our team performing on-site vacuum packing at client location.',
        type: 'video',
        videoUrl: 'images/gallery/WhatsApp Video 2026-04-28 at 14.27.41.mp4',
        image: { url: 'images/gallery/Packing.webp', alt: 'On-site' },
        category: 'General', visible: true, order: 1
      },
      {
        title: 'Heavy Loading Protocol',
        description: 'Standardized protocol for loading heavy industrial goods.',
        type: 'video',
        videoUrl: 'images/gallery/WhatsApp Video 2026-04-28 at 14.27.54.mp4',
        image: { url: 'images/gallery/woodenskids.webp', alt: 'Loading' },
        category: 'General', visible: true, order: 2
      },
      {
        title: 'Machine Securing Process',
        description: 'Step-by-step lashing and securing of heavy machinery.',
        type: 'video',
        videoUrl: 'images/gallery/WhatsApp Video 2026-04-28 at 14.27.55.mp4',
        image: { url: 'images/gallery/heavymachinepacking.webp', alt: 'Securing' },
        category: 'General', visible: true, order: 3
      },
      {
        title: 'Precision Crating Demo',
        description: 'Demonstrating custom crating for sensitive electronics.',
        type: 'video',
        videoUrl: 'images/gallery/WhatsApp Video 2026-04-28 at 14.29.08.mp4',
        image: { url: 'images/gallery/Boxes.webp', alt: 'Crating' },
        category: 'Crating', visible: true, order: 4
      },

      // IMAGES
      {
        title: 'Europack Wooden Pallets',
        description: 'High-quality ISPM-15 compliant wooden pallets.',
        type: 'image',
        image: { url: 'images/gallery/woodenskids.webp', alt: 'Wooden Pallets' },
        category: 'Palletising', visible: true, order: 5
      },
      {
        title: 'Heavy Duty Crating',
        description: 'Specialized crating for engineering components.',
        type: 'image',
        image: { url: 'images/gallery/heavyengineeringpacking.webp', alt: 'Heavy Crating' },
        category: 'Crating', visible: true, order: 6
      },
      {
        title: 'Vacuum Shrink Wrap',
        description: 'Advanced moisture protection technology.',
        type: 'image',
        image: { url: 'images/gallery/shrinkpacking.webp', alt: 'Vacuum Packing' },
        category: 'Crating', visible: true, order: 7
      },
      {
        title: 'Nail-less Tech Boxes',
        description: 'Innovative nail-less plywood boxes.',
        type: 'image',
        image: { url: 'images/gallery/naillessboxes.webp', alt: 'Nail-less Boxes' },
        category: 'Crating', visible: true, order: 8
      },
      {
        title: 'Strategic ODC Lashing',
        description: 'Securing oversized cargo for international transit.',
        type: 'image',
        image: { url: 'images/gallery/hugemachinepacking.webp', alt: 'ODC Lashing' },
        category: 'General', visible: true, order: 9
      }
    ];

    await GalleryItem.insertMany(items);
    console.log(`Seeded ${items.length} items with videos and images.`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedGallery();

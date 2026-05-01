import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// MongoDB URI
const MONGO_URI = 'mongodb://localhost:27017/europack';

// Gallery Schema (Matching your project)
const gallerySchema = new mongoose.Schema({
  title: String,
  category: String,
  type: { type: String, default: 'image' },
  image: {
    url: String,
    alt: String
  },
  tags: [String],
  description: String,
  order: { type: Number, default: 0 }
});

const Gallery = mongoose.model('Gallery', gallerySchema);

async function seedGallery() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB...');

    // Clear existing gallery (Optional)
    await Gallery.deleteMany({});

    // Path to your gallery images
    const galleryDir = '/var/www/neweuropackweb/client/public/images/Gallery';
    const files = fs.readdirSync(galleryDir);

    const galleryItems = files.map((file, index) => {
      const isVideo = file.endsWith('.mp4');
      const title = file.split('.')[0].replace(/-/g, ' ').replace(/_/g, ' ');
      
      return {
        title: title || `Gallery Item ${index + 1}`,
        category: 'Industrial',
        type: isVideo ? 'video' : 'image',
        image: {
          url: `images/Gallery/${file}`,
          alt: title
        },
        videoUrl: isVideo ? `images/Gallery/${file}` : undefined,
        tags: ['Packaging', 'Industrial', 'Europack'],
        description: `High-quality industrial packaging solution: ${title}`,
        order: index
      };
    });

    await Gallery.insertMany(galleryItems);
    console.log(`Successfully seeded ${galleryItems.length} items into the Gallery!`);
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedGallery();

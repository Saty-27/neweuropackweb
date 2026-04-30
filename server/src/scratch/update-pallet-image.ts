import mongoose from 'mongoose';
import Product from '../models/Product';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/europack';

async function updatePalletImage() {
  try {
    await mongoose.connect(MONGO_URI);
    
    // Update wooden pallet category/products in DB
    const result = await Product.updateMany(
      { title: { $regex: /Two Way Pallet/i } },
      { $set: { image: '/images/products/two-way-pallets.jpeg' } }
    );
    console.log(`✅ Updated ${result.modifiedCount} Two Way Pallet products.`);

    const result4 = await Product.updateMany(
      { title: { $regex: /Four Way Pallet/i } },
      { $set: { image: '/images/products/four-way-pallets.webp' } }
    );
    console.log(`✅ Updated ${result4.modifiedCount} Four Way Pallet products.`);

    const resultHW = await Product.updateMany(
      { title: { $regex: /Hardwood Pallet/i } },
      { $set: { image: '/images/products/hardwood-pallets.jpg' } }
    );
    console.log(`✅ Updated ${resultHW.modifiedCount} Hardwood Pallet products.`);
    
    // Also check for category main image
    const catResult = await Product.updateMany(
      { category: 'Pallet Solutions', title: 'Wooden Pallets' },
      { $set: { image: '/images/products/two-way-pallets.jpeg' } }
    );
    console.log(`✅ Updated ${catResult.modifiedCount} categories in database.`);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updatePalletImage();

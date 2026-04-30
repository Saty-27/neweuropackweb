import mongoose from 'mongoose';
import Product from '../models/Product';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/europack';

async function listProducts() {
  try {
    await mongoose.connect(MONGO_URI);
    const products = await Product.find({});
    console.log(JSON.stringify(products, null, 2));
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

listProducts();

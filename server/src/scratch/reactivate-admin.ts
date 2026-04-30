import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/europack';

const reactivateAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to Industrial Database Matrix...');

    const adminEmail = 'admin@europack.in';
    const user = await User.findOne({ email: adminEmail });

    if (!user) {
      console.log(`❌ Identity Error: User with email ${adminEmail} not found.`);
      process.exit(1);
    }

    console.log(`Current Status for ${adminEmail}: ${user.status}`);
    
    if (user.status === 'inactive') {
      user.status = 'active';
      await user.save();
      console.log(`✅ Success: Account ${adminEmail} has been reactivated to 'active' status.`);
    } else {
      console.log(`ℹ️ Identity Check: Account ${adminEmail} is already ${user.status}.`);
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Database Sync Failure:', err);
    process.exit(1);
  }
};

reactivateAdmin();

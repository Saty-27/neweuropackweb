import mongoose from 'mongoose';
import Homepage from './src/models/Homepage';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/europack';

const seedWelcome = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');

    let hp = await Homepage.findOne();
    if (!hp) hp = new Homepage();

    hp.welcomeSection = {
      tagline: "WELCOME TO EUROPACK",
      heading: "India's Most Trusted Industrial Packaging Partner.",
      description: "Since 1993, Europack has protected the products of India's most demanding manufacturers. From heavy machinery export crating to precision pharmaceutical packaging — we engineer solutions that guarantee safe arrival, every time.",
      backgroundDesktopImage: "images/banners/welcome-bg.png",
      backgroundTabletImage: "images/banners/welcome-bg.png",
      backgroundMobileImage: "images/banners/welcome-bg.png",
      featureCards: [],
      counterCards: [
        { icon: "users", number: "1000+", label: "Happy Customers" },
        { icon: "clock", number: "33", label: "Years Experience" },
        { icon: "shield", number: "100%", label: "Safe Delivery" },
        { icon: "globe", number: "50+", label: "Cities Served" }
      ]
    };

    await hp.save();
    console.log('Successfully seeded Welcome section data.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedWelcome();

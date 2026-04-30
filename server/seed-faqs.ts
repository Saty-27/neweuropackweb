import mongoose from 'mongoose';
import FAQ from './src/models/FAQ';
import FAQSettings from './src/models/FAQSettings';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/europack';

const seedFAQs = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clean up
    await FAQ.deleteMany({});
    await FAQSettings.deleteMany({});

    // 1. Create FAQs for Home Page (matching Image 1 & 2 content)
    const homeFAQs = [
      {
        question: "What does Europack specialize in?",
        answer: "Europack specializes in industrial packaging solutions including wooden pallets, wooden boxes, corrugated boxes, plastic pallets, dunnage bags, and export packaging services for various industries.",
        pages: ['home'],
        order: 1
      },
      {
        question: "What industries do you serve?",
        answer: "We serve industries such as heavy engineering, automotive, pharmaceutical, manufacturing, logistics, and export businesses.",
        pages: ['home', 'about'],
        order: 2
      },
      {
        question: "How many years of experience does Europack have?",
        answer: "Europack has over 33 years of experience in the packaging and manufacturing industry.",
        pages: ['home', 'about'],
        order: 3
      },
      {
        question: "Do you provide custom packaging solutions?",
        answer: "Yes, we design and manufacture packaging solutions customized according to product size, weight, and transportation requirements.",
        pages: ['home', 'products'],
        order: 4
      },
      {
        question: "Where is Europack located?",
        answer: "Europack operates in India and serves clients across the country as well as international export businesses.",
        pages: ['home', 'contact'],
        order: 5
      }
    ];

    await FAQ.insertMany(homeFAQs);
    console.log('Created 5 FAQs');

    // 2. Create Default settings for Home Page (Accordion + Graphic)
    await FAQSettings.create({
      page: 'home',
      layoutType: 'accordion',
      designMode: 'graphic',
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about our packaging solutions.',
      overlayColor: '#000000',
      overlayOpacity: 85,
      textColor: '#ffffff'
    });
    console.log('Created Homepage FAQ settings');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedFAQs();

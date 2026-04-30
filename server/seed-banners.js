const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/europack';

// Define minimal schema just for updating
const HomepageSchema = new mongoose.Schema({}, { strict: false });
const Homepage = mongoose.model('Homepage', HomepageSchema, 'homepages');

const seedBanners = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const bannersConfig = [
      {
        desktopImage: '/images/banners/1.png',
        tabletImage: '/images/banners/1.png',
        mobileImage: '/images/banners/1.png',
        imageAlt: 'Heavy Industrial Machine Crating',
        heading: "India's Trusted Industrial Packaging Experts",
        subheading: '33+ Years Experience | Export Packaging | Wooden Crates | Pallets',
        buttons: [{ text: 'Get Quote', link: '/contact' }],
        order: 1,
        status: true
      },
      {
        desktopImage: '/images/banners/2.png',
        tabletImage: '/images/banners/2.png',
        mobileImage: '/images/banners/2.png',
        imageAlt: 'Vibrant Orange Ratchet Lashing Straps',
        heading: 'Secure. Protect. Deliver.',
        subheading: 'Engineered Precision Lashing & Container Cargo Securing',
        buttons: [{ text: 'View Services', link: '/services' }],
        order: 2,
        status: true
      },
      {
        desktopImage: '/images/banners/3.png',
        tabletImage: '/images/banners/3.png',
        mobileImage: '/images/banners/3.png',
        imageAlt: 'Massive Wood Pallet Warehouse Storage',
        heading: 'Scale Without Limits',
        subheading: 'Complete Packaging Solutions Under One Roof – Design to Delivery',
        buttons: [{ text: 'Our Products', link: '/products' }],
        order: 3,
        status: true
      },
      {
        desktopImage: '/images/banners/4.png',
        tabletImage: '/images/banners/4.png',
        mobileImage: '/images/banners/4.png',
        imageAlt: 'Heavy Forklift Container Loading',
        heading: 'Trusted by 1000+ Manufacturers',
        subheading: 'Unmatched 99.8% Zero-Claim Global Export Track Record',
        buttons: [{ text: 'Read Case Studies', link: '/case-studies' }],
        order: 4,
        status: true
      }
    ];

    let homepage = await Homepage.findOne();
    if (!homepage) {
      homepage = new Homepage({ banners: bannersConfig });
    } else {
      homepage.set('banners', bannersConfig);
    }
    
    await homepage.save();
    console.log('Successfully seeded 4 AI banners into the Homepage document!');
    
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedBanners();

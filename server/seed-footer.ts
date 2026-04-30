import mongoose from 'mongoose';
import Footer from './src/models/Footer';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/europack';

const seedFooter = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');

    let footer = await Footer.findOne();
    if (!footer) {
      console.log('Footer not found, creating new one...');
      footer = new Footer();
    }

    footer.socialLinks = [
      { name: 'YouTube', icon: 'youtube', link: 'https://www.youtube.com/@EUROPACK-i6t/videos' },
      { name: 'LinkedIn', icon: 'linkedin', link: 'https://www.linkedin.com/company/europack?originalSubdomain=in' },
      { name: 'Instagram', icon: 'instagram', link: 'https://www.instagram.com/europack.in/' },
      { name: 'Google', icon: 'search', link: 'https://www.google.com/search?q=eUROPACK&oq=eUROPACK&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg7MgYIAhBFGDsyBggDEEUYPDIGCAQQRRg8MgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEIMTk5MWowajSoAgCwAgE&sourceid=chrome&ie=UTF-8#sv=CAwSwwEKBmxjbF9wdhIxCgNwdnESKkNnMHZaeTh4TVdZMFgydHNaek4ySWc0S0NHVlZVazlRUVVOTEVBSVlBdxJPCgNscWkSSENnaGxWVkpQVUVGRFMwajY4T1Q0azYyQWdBaGFEaEFBR0FBaUNHVjFjbTl3WVdOcmtnRVBjR0ZzYkdWMFgzTjFjSEJzYVdWeRISCgN0YnMSC2xyZjohM3NJQUU9Eg0KAXESCGVVUk9QQUNLGhJsb2NhbC1wbGFjZS12aWV3ZXIYCiDY9NHVCg' },
      { name: 'Facebook', icon: 'facebook', link: 'https://www.facebook.com/people/Europack/100071175203381/#' }
    ];

    await footer.save();
    console.log('Successfully updated footer social links.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedFooter();

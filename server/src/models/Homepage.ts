import mongoose, { Document, Schema } from 'mongoose';

// --- Sub-schemas for deeply nested objects ---

const ButtonSchema = new Schema({
  text: { type: String, required: true },
  link: { type: String, required: true }
});

const BannerSchema = new Schema({
  desktopImage: { type: String, required: true },
  tabletImage: { type: String, required: true },
  mobileImage: { type: String, required: true },
  imageAlt: { type: String },
  imageTitle: { type: String },
  heading: { type: String },
  subheading: { type: String },
  description: { type: String },
  buttons: [ButtonSchema],
  order: { type: Number, default: 0 },
  status: { type: Boolean, default: true },
  scheduledPublishDate: { type: Date }
});

const CompanyLogoSchema = new Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  logoAlt: { type: String },
  logoTitle: { type: String },
  link: { type: String },
  order: { type: Number, default: 0 },
  status: { type: Boolean, default: true }
});

const FeatureCardSchema = new Schema({
  icon: { type: String, required: true },
  iconAlt: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const CounterCardSchema = new Schema({
  number: { type: String, required: true },
  label: { type: String, required: true },
  icon: { type: String }
});

const WelcomeSectionSchema = new Schema({
  tagline: { type: String },
  backgroundDesktopImage: { type: String },
  backgroundTabletImage: { type: String },
  backgroundMobileImage: { type: String },
  backgroundAlt: { type: String },
  heading: { type: String },
  description: { type: String },
  featureCards: {
    type: [FeatureCardSchema],
    validate: [
      (arr: any[]) => arr.length <= 3,
      'Feature cards array cannot exceed 3 items'
    ]
  },
  counterCards: {
    type: [CounterCardSchema],
    validate: [
      (arr: any[]) => arr.length <= 4,
      'Counter cards array cannot exceed 4 items'
    ]
  }
});

const SeoSchema = new Schema({
  title: { type: String },
  description: { type: String },
  keywords: { type: [String], default: [] },
  slug: { type: String, default: 'home' }
});

const GlobalSectionSchema = new Schema({
  titlePart1: { type: String },
  titlePart2: { type: String },
  titleColor1: { type: String, default: '#ffffff' },
  titleColor2: { type: String, default: '#ff6b00' },
  titleFontSize: { type: String, default: 'clamp(2.5rem, 5vw, 4.5rem)' },
  titleFontWeight: { type: String, default: '800' },
  titleFontStyle: { type: String, default: 'normal' },
  titleFontFamily: { type: String, default: 'inherit' },
  description: { type: String },
  buttonText: { type: String },
  buttonLink: { type: String },
  backgroundImage: { type: String },
  videoUrl: { type: String },
  isActive: { type: Boolean, default: true }
});

// --- Main Document Schema ---

const ContactCardSchema = new Schema({
  header: { type: String, required: true },
  details: { type: String, required: true },
  icon: { type: String, default: 'MapPin' }
});

const ContactSectionSchema = new Schema({
  titlePart1: { type: String, default: 'Contact' },
  titlePart2: { type: String, default: 'Us Today' },
  titleColor1: { type: String, default: 'black' },
  titleColor2: { type: String, default: '#ff6600' },
  fontSize: { type: String, default: '2.5rem' },
  fontFamily: { type: String, default: 'Poppins' },
  backgroundColor: { type: String, default: '#ffffff' },
  backgroundGradient: { type: String, default: '' },
  mapUrl: { type: String, default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8164326556553!2d72.8524497!3d19.0718501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e123f123f1%3A0x1234567890abcdef!2sEuropack!5e0!3m2!1sen!2sin!4v1711620000000!5m2!1sen!2sin' },
  infoCards: [ContactCardSchema],
  viewMoreLink: { type: String, default: '/contact' },
  showForm: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true }
});

export interface IHomepage extends Document {
  banners: any[];
  companyLogos: any[];
  welcomeSection: any;
  globalSection: any;
  contactSection: any;
  seo: any;
  version: number;
}

const HomepageSchema: Schema = new Schema({
  banners: [BannerSchema],
  companyLogos: [CompanyLogoSchema],
  welcomeSection: { type: WelcomeSectionSchema, default: {} },
  globalSection: { type: GlobalSectionSchema, default: {} },
  contactSection: { type: ContactSectionSchema, default: {} },
  seo: { type: SeoSchema, default: {} },
  version: { type: Number, default: 1 }
}, {
  timestamps: true
});

export default mongoose.model<IHomepage>('Homepage', HomepageSchema);

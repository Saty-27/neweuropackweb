import mongoose, { Schema, Document } from 'mongoose';

export interface IFooter extends Document {
  logo: string;
  logoAlt: string;
  tagline: string;
  description: string;
  
  typography: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    color: string;
    letterSpacing?: string;
    headingColor?: string;
  };

  quickLinks: { name: string; link: string }[];
  
  socialLinks: { 
    name: string; 
    icon: string; 
    link: string;
  }[];

  productsHeader: string;
  servicesHeader: string;
  industriesHeader: string;

  contact: {
    headOffice: {
      title: string;
      address: string;
      phones: { number: string, label: string }[];
      emails: { address: string, label: string }[];
    };
    factories: {
      name: string;
      location: string;
      gst: string;
    }[];
  };

  trustIndicators: {
    experienceYears: string;
    clientCount: string;
    specialty: string;
  };

  ctaStrip: {
    show: boolean;
    heading: string;
    subtext: string;
    buttonText: string;
    buttonLink: string;
  };

  bottom: {
    copyright: string;
    links: { name: string; link: string }[];
  };

  backgroundColor: string;
  backgroundGradient?: string;
  backgroundImage?: string;

  // Visibility Toggles
  showProducts: boolean;
  showServices: boolean;
  showIndustries: boolean;
  showBottom: boolean;
}

const FooterSchema: Schema = new Schema({
  logo: { type: String },
  logoAlt: { type: String, default: 'Europack' },
  tagline: { type: String, default: 'Technical Packing Solutions' },
  description: { type: String },
  
  typography: {
    fontFamily: { type: String, default: 'Poppins' },
    fontSize: { type: String, default: '14px' },
    fontWeight: { type: String, default: '400' },
    color: { type: String, default: '#ffffff' },
    letterSpacing: { type: String, default: '0px' },
    headingColor: { type: String, default: '#FF6600' }
  },

  quickLinks: [{
    name: { type: String },
    link: { type: String }
  }],
  socialLinks: [{
    name: { type: String },
    icon: { type: String },
    link: { type: String }
  }],

  productsHeader: { type: String, default: 'Pallet Solutions' },
  servicesHeader: { type: String, default: 'Industrial Services' },
  industriesHeader: { type: String, default: 'Industries We Serve' },

  contact: {
    headOffice: {
      title: { type: String, default: 'Head Office — Europack' },
      address: { type: String },
      phones: [{ number: { type: String }, label: { type: String } }],
      emails: [{ address: { type: String }, label: { type: String } }]
    },
    factories: [{
      name: { type: String },
      location: { type: String },
      gst: { type: String }
    }]
  },

  trustIndicators: {
    experienceYears: { type: String, default: '33+' },
    clientCount: { type: String, default: '1000+' },
    specialty: { type: String, default: 'Export Specialists' }
  },

  ctaStrip: {
    show: { type: Boolean, default: true },
    heading: { type: String, default: 'Ready to discuss your packaging needs?' },
    subtext: { type: String, default: 'Get a customised quote within 24 hours.' },
    buttonText: { type: String, default: 'GET YOUR FREE QUOTE' },
    buttonLink: { type: String, default: '/contact' }
  },

  bottom: {
    copyright: { type: String },
    links: [{
      name: { type: String },
      link: { type: String }
    }]
  },
  backgroundColor: { type: String, default: '#0B0F19' },
  backgroundGradient: { type: String },
  backgroundImage: { type: String },

  showProducts: { type: Boolean, default: true },
  showServices: { type: Boolean, default: true },
  showIndustries: { type: Boolean, default: true },
  showBottom: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<IFooter>('Footer', FooterSchema);

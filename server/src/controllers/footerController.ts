import { Request, Response } from 'express';
import Footer from '../models/Footer';
import { AuthRequest } from '../middleware/auth';

// Get footer settings (Public & Admin)
export const getFooter = async (req: Request, res: Response) => {
  try {
    let footer = await Footer.findOne();
    
    // Create default if none exists
    if (!footer) {
      footer = await Footer.create({
        logo: '',
        logoAlt: 'Europack',
        tagline: 'Technical Packing Solutions',
        description: "India's trusted leader in industrial packaging since 1993. Specialists in ISPM-15 certified wooden crates, vacuum packing, export packaging, and heavy engineering solutions.",
        typography: {
          fontFamily: 'Poppins',
          fontSize: '14px',
          fontWeight: '400',
          color: '#EAEAEA',
          headingColor: '#FF6600'
        },
        quickLinks: [
          { name: 'Home', link: '/' },
          { name: 'About Us', link: '/about' },
          { name: 'Services', link: '/services' },
          { name: 'Our Clients', link: '/clients' },
          { name: 'Case Studies', link: '/case-studies' },
          { name: 'Testimonials', link: '/testimonials' },
          { name: 'Blog', link: '/blog' },
          { name: 'Careers', link: '/careers' },
          { name: 'Contact', link: '/contact' }
        ],
        socialLinks: [
          { name: 'WhatsApp', icon: '', link: '#' },
          { name: 'LinkedIn', icon: '', link: '#' },
          { name: 'YouTube', icon: 'youtube', link: 'https://www.youtube.com/@EUROPACK-i6t/videos' },
          { name: 'Instagram', icon: '', link: '#' }
        ],
        contact: {
          headOffice: {
            title: 'Head Office — Europack',
            address: '101, M. L. Spaces, D. J. Road Station Road, Vile Parle West, Mumbai – 400056, Maharashtra, India',
            phones: [
              { number: '+91 9833776290', label: 'Divyesh Chokshi' },
              { number: '+91 98201 93702', label: 'Dhanik Chheda' }
            ],
            emails: [
              { address: 'info@europackpackagingproducts.com', label: 'Inquiry' },
              { address: 'sales@europackindia.in', label: 'Sales' }
            ]
          },
          factories: [
            { name: 'Factory 1 — Bhiwandi', location: 'Shakti Industrial Complex, Vasai Road', gst: '27AAAFE1305L1ZR' },
            { name: 'Factory 2 — Jamshedpur', location: 'Adityapur Industrial Area', gst: '20AAAFE1305L1Z5' },
            { name: 'Factory 3 — Vadodara', location: 'G.J. Patel Estate', gst: '24AAAFE1305L2ZW' }
          ]
        },
        trustIndicators: {
          experienceYears: '33+',
          clientCount: '1000+',
          specialty: 'Export Specialists'
        },
        ctaStrip: {
          show: true,
          heading: 'Ready to discuss your packaging needs?',
          subtext: 'Get a customised quote within 24 hours.',
          buttonText: 'GET YOUR FREE QUOTE',
          buttonLink: '/contact'
        },
        bottom: {
          copyright: `© ${new Date().getFullYear()} Europack . All rights reserved.`,
          links: [
            { name: 'Privacy Policy', link: '/privacy' },
            { name: 'Terms of Service', link: '/terms' },
            { name: 'Sitemap', link: '/sitemap' }
          ]
        },
        backgroundColor: '#0B0F19',
        showProducts: true,
        showServices: true,
        showIndustries: true,
        showBottom: true
      });
    }
    
    res.status(200).json({ success: true, data: footer });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update footer settings (Admin only)
export const updateFooter = async (req: AuthRequest, res: Response) => {
  try {
    const footer = await Footer.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: footer });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

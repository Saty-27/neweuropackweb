import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Blog from '../models/Blog';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const blogs = [
  {
    title: 'ISPM-15: The Complete Guide to Heat-Treated Packaging',
    subtitle: 'Understanding international export compliance and pest prevention in wood packaging.',
    slug: 'ispm-15-guide-heat-treated-packaging',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    category: 'Compliance',
    tags: ['ISPM-15', 'Export', 'Packaging Standards'],
    status: 'published',
    author: 'Europack Technical Team',
    contentBlocks: [
      {
        type: 'heading',
        content: { text: 'What is ISPM-15?' },
        order: 0
      },
      {
        type: 'paragraph',
        content: { text: 'International Standards for Phytosanitary Measures No. 15 (ISPM-15) is an international phytosanitary measure developed by the International Plant Protection Convention (IPPC) that directly addresses the need to treat wood materials of a thickness greater than 6mm, used to ship products between countries.' },
        order: 1
      },
      {
        type: 'heading',
        content: { text: 'The Core Requirements' },
        order: 2
      },
      {
        type: 'paragraph',
        content: { text: 'The main purpose of ISPM-15 is to prevent the international transport and spread of disease and insects that could negatively affect plants or ecosystems. It affects all wood packaging material (pallets, crates, dunnages, etc.) requiring that they be debarked and then heat treated or fumigated with methyl bromide and stamped or branded with a mark of compliance.' },
        order: 3
      },
      {
        type: 'list',
        content: { items: [
          'Heat Treatment (HT): Wood must be heated until its core temperature reaches 56°C for at least 30 minutes.',
          'Dielectric Heating (DH): Using microwaves or radio waves to reach 60°C.',
          'SF (Sulfuryl Fluoride) or MB (Methyl Bromide) fumigation.'
        ]},
        order: 4
      }
    ]
  },
  {
    title: 'The Physics of Ocean Lashing: Achieving Zero Cargo Shift',
    subtitle: 'Mastering the forces of nature to ensure safe transit of heavy machinery.',
    slug: 'physics-of-ocean-lashing',
    heroImage: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80&w=1200&auto=format&fit=crop',
    category: 'Technical',
    tags: ['Lashing', 'Ocean Freight', 'Cargo Safety'],
    status: 'published',
    author: 'Logistics Engineer',
    contentBlocks: [
      {
        type: 'heading',
        content: { text: 'Forces at Play During Sea Transit' },
        order: 0
      },
      {
        type: 'paragraph',
        content: { text: 'When a ship moves through the ocean, it experiences six degrees of freedom: rolling, pitching, heaving, swaying, surging, and yawing. For heavy cargo, the most critical force is often the lateral acceleration caused by rolling.' },
        order: 1
      },
      {
        type: 'heading',
        content: { text: 'The Calculus of Lashing' },
        order: 2
      },
      {
        type: 'paragraph',
        content: { text: 'Effective lashing isn’t just about tying things down; it’s about calculating the friction coefficient of the deck vs. the weight of the cargo and the angle of the lashing wires. Ideally, lashing should be applied at an angle between 30 and 60 degrees to provide both vertical and horizontal restraint.' },
        order: 3
      }
    ]
  },
  {
    title: 'VCI Packaging: How to Protect Metal from Corrosion',
    subtitle: 'Eliminating rust through molecular engineering in industrial packaging.',
    slug: 'vci-packaging-corrosion-protection',
    heroImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop',
    category: 'Innovation',
    tags: ['VCI', 'Corrosion', 'Metal Protection'],
    status: 'published',
    author: 'Materials Scientist',
    contentBlocks: [
      {
        type: 'heading',
        content: { text: 'How VCI Works' },
        order: 0
      },
      {
        type: 'paragraph',
        content: { text: 'Volatile Corrosion Inhibitors (VCI) are a type of chemical compound that releases a gas into a sealed space. These molecules then form a thin, protective layer on the surface of any metal objects within that space, preventing oxygen and moisture from reacting with the metal.' },
        order: 1
      },
      {
        type: 'heading',
        content: { text: 'Benefits of VCI vs. Traditional Greasing' },
        order: 2
      },
      {
        type: 'list',
        content: { items: [
          'No need for messy oils or greases that require cleaning.',
          'Protects hard-to-reach internal cavities of machinery.',
          'Environmentally friendly and recyclable.',
          'Saves labor costs during both packaging and unboxing.'
        ]},
        order: 3
      }
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/europack');
    console.log('Connected to MongoDB');

    for (const blog of blogs) {
      await Blog.findOneAndUpdate({ slug: blog.slug }, blog, { upsert: true, new: true });
      console.log(`Seeded blog: ${blog.title}`);
    }

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding blogs:', error);
    process.exit(1);
  }
}

seed();

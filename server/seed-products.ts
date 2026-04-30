import mongoose from 'mongoose';
import Product from './src/models/Product.js';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/europack';

const products = [
  {
    title: "Wooden Pallets",
    description: "ISPM-15 certified pallets built to handle heavy-duty export loads with reliability.",
    image: "/images/products/wooden-pallets.png",
    slug: "wooden-pallets",
    features: [
      "Heat-treated pine wood",
      "Export compliant (ISPM-15)",
      "High load capacity",
      "Custom sizes available"
    ],
    viewLink: "/products/wooden-pallets",
    quoteLink: "/contact",
    active: true,
    order: 1
  },
  {
    title: "Corrugated Boxes",
    description: "3-ply to 9 -ply custom-printed corrugated boxes for any weight requirement.",
    image: "/images/products/corrugated-boxes.png",
    slug: "corrugated-boxes",
    features: [
      "9 ply extreme strength",
      "Moisture resistant coating",
      "Custom brand printing",
      "Stackable rigidity"
    ],
    viewLink: "/products/corrugated-boxes",
    quoteLink: "/contact",
    active: true,
    order: 2
  },
  {
    title: "Dunnage Bags",
    description: "AAR-certified inflatable void fill bags for zero cargo shift in transit.",
    image: "/images/products/dunnage-bags.png",
    slug: "dunnage-bags",
    features: [
      "AAR certified materials",
      "Zero cargo shifting",
      "Reusable heavy-duty valve",
      "High burst pressure"
    ],
    viewLink: "/products/dunnage-bags",
    quoteLink: "/contact",
    active: true,
    order: 3
  },
  {
    title: "Seaworthy Packing",
    description: "Multi-layered moisture barrier packing for long sea voyages.",
    image: "/images/products/seaworthy-packing.png",
    slug: "seaworthy-packing",
    features: [
      "VCI foil wrapping",
      "Desiccant insertion",
      "Rust & corrosion proof",
      "Vacuum internal seal"
    ],
    viewLink: "/products/seaworthy-packing",
    quoteLink: "/contact",
    active: true,
    order: 4
  },
  {
    title: "Lashing Materials",
    description: "Industrial grade heavy lashing straps and securing mechanisms.",
    image: "/images/products/lashing-materials.png",
    slug: "lashing-materials",
    features: [
      "5 Ton load capacity",
      "Weather resistant poly",
      "Heavy duty ratchets",
      "Container compliant"
    ],
    viewLink: "/products/lashing-materials",
    quoteLink: "/contact",
    active: true,
    order: 5
  },
  {
    title: "Vacuum Packing",
    description: "Complete vacuum sealing for sensitive electronics and machinery.",
    image: "/images/products/vacuum-packing.png",
    slug: "vacuum-packing",
    features: [
      "100% moisture removal",
      "Dust and dirt proof",
      "Extends shelf life",
      "Anti-static options"
    ],
    viewLink: "/products/vacuum-packing",
    quoteLink: "/contact",
    active: true,
    order: 6
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');

    await Product.deleteMany({});
    console.log('Cleared existing products.');

    await Product.insertMany(products);
    console.log('Successfully seeded 6 new products.');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedProducts();

import fs from 'fs';
import path from 'path';

// This script generates the 5000+ blog permutations

const products = [
  'Wooden Pallets',
  'Seaworthy Packing',
  'Wooden Boxes',
  'Shrink Wrapping',
  'Corrugated Boxes'
];

const intents = [
  'Manufacturer', 'Supplier', 'Dealer', 'Export Packaging', 'Industrial Packaging',
  'Near Me', 'For Export Cargo', 'For Heavy Machinery', 'For Warehouse', 'Price Guide',
  'For Pharma Industry', 'For Sea Shipment', 'Local Vendor', 'Bulk Supplier', 'For CNC Machines'
];

const locations = [
  // Western Line
  'Churchgate', 'Marine Lines', 'Charni Road', 'Grant Road', 'Mumbai Central', 'Mahalaxmi', 
  'Lower Parel', 'Prabhadevi', 'Dadar', 'Matunga Road', 'Mahim', 'Bandra', 'Khar Road', 
  'Santacruz', 'Vile Parle', 'Andheri', 'Jogeshwari', 'Ram Mandir', 'Goregaon', 'Malad', 
  'Kandivali', 'Borivali', 'Dahisar', 'Mira Road', 'Bhayandar', 'Naigaon', 'Vasai', 
  'Nallasopara', 'Virar', 'Vaitarna', 'Saphale', 'Kelve Road', 'Palghar', 'Umroli', 
  'Boisar', 'Vangaon', 'Dahanu',

  // Central Line
  'CSMT', 'Masjid', 'Sandhurst Road', 'Byculla', 'Chinchpokli', 'Currey Road', 'Parel', 
  'Sion', 'Kurla', 'Vidyavihar', 'Ghatkopar', 'Vikhroli', 'Kanjurmarg', 'Bhandup', 
  'Nahur', 'Mulund', 'Thane', 'Kalwa', 'Mumbra', 'Diva', 'Kopar', 'Dombivli', 
  'Thakurli', 'Kalyan', 'Shahad', 'Ambivli', 'Titwala', 'Asangaon',

  // Harbour / Navi Mumbai
  'Dockyard Road', 'Reay Road', 'Cotton Green', 'Sewri', 'Wadala', 'GTB Nagar', 
  'Chunabhatti', 'Tilak Nagar', 'Chembur', 'Govandi', 'Mankhurd', 'Vashi', 'Sanpada', 
  'Juinagar', 'Nerul', 'Seawoods', 'Belapur', 'Kharghar', 'Mansarovar', 'Khandeshwar', 
  'Panvel', 'Turbhe', 'Koparkhairane', 'Ghansoli', 'Rabale', 'Airoli',

  // Industrial & Cargo Hubs
  'JNPT', 'Nhava Sheva', 'Mumbai Port', 'Sahar Cargo', 'Andheri MIDC', 'SEEPZ', 'BKC', 
  'Marol', 'Saki Naka', 'Chakala', 'TTC Industrial Area', 'Mahape', 'Taloja MIDC', 
  'Bhiwandi Warehouse Zone', 'Wagle Estate', 'Powai'
];

interface BlogEntry {
  id: string;
  title: string;
  slug: string;
  product: string;
  location: string;
  intent: string;
  priority: string;
}

const generateIndex = () => {
  const blogs: BlogEntry[] = [];
  let counter = 1;

  products.forEach(product => {
    locations.forEach(location => {
      // Pick 3-5 random intents for each product+location combo to get ~5000 total
      // Or just loop all intents.
      // 5 products * 105 locations * 10 intents = 5250 blogs. Perfect.
      
      const selectedIntents = intents.slice(0, 10); 
      
      selectedIntents.forEach(intent => {
        
        let title = '';
        if (intent.startsWith('For ')) {
          title = `${product} ${intent} in ${location} Mumbai`;
        } else if (intent === 'Near Me' || intent === 'Price Guide') {
          title = `${product} ${intent} in ${location}`;
        } else {
          title = `${product} ${intent} Near ${location} for Industrial Packaging`;
        }

        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        
        blogs.push({
          id: `EP-BLOG-${String(counter).padStart(4, '0')}`,
          title,
          slug,
          product,
          location,
          intent,
          priority: counter < 100 ? 'High' : 'Medium'
        });
        counter++;
      });
    });
  });

  const outputPath = path.join(__dirname, '../client/src/constants/blogIndex.json');
  fs.writeFileSync(outputPath, JSON.stringify(blogs, null, 2));
  console.log(`Generated ${blogs.length} SEO blogs! Saved to ${outputPath}`);
};

generateIndex();

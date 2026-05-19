export interface SeoLocation {
  name: string;
  type: 'Mumbai Western' | 'Mumbai Central' | 'Navi Mumbai' | 'Industrial Area' | 'Port/Cargo' | 'Metro' | 'Harbour';
  nearbyAreas: string[];
}

export interface SeoProduct {
  id: string;
  name: string;
  coreKeyword: string;
  features: string[];
  industries: string[];
  useCases: string[];
}

export const seoProducts: SeoProduct[] = [
  {
    id: 'wooden-pallets',
    name: 'Wooden Pallets',
    coreKeyword: 'wooden pallet',
    features: ['ISPM-15 Certified', 'Heavy-duty load capacity', 'Export compliant', 'Fumigated & Heat Treated'],
    industries: ['Pharmaceuticals', 'FMCG', 'Automobile', 'Heavy Engineering', 'Logistics'],
    useCases: ['Warehouse storage', 'Export sea freight', 'Container stuffing', 'Heavy machinery support']
  },
  {
    id: 'seaworthy-packing',
    name: 'Seaworthy Packing',
    coreKeyword: 'seaworthy packing',
    features: ['Moisture barrier protection', 'Vacuum sealing', 'Anti-corrosion VCI treatment', 'Lashing & choking'],
    industries: ['Heavy Machinery', 'Oil & Gas', 'Marine Equipment', 'Transformers'],
    useCases: ['Break bulk cargo', 'Flat rack container shipping', 'Long sea voyages', 'ODC cargo export']
  },
  {
    id: 'wooden-boxes',
    name: 'Wooden Boxes',
    coreKeyword: 'wooden box',
    features: ['Custom structural design', 'Shock absorption', 'Stackable design', 'Plywood and Pinewood options'],
    industries: ['Electronics', 'Medical Equipment', 'Automobile Components', 'Defense'],
    useCases: ['Fragile equipment transport', 'Export crating', 'Consolidated cargo', 'Air freight']
  },
  {
    id: 'shrink-wrapping',
    name: 'Shrink Wrapping',
    coreKeyword: 'shrink wrapping',
    features: ['Dust & moisture resistance', 'Tamper evident', 'UV protection', 'Tightly secures pallet loads'],
    industries: ['FMCG', 'Textiles', 'Food Processing', 'E-commerce'],
    useCases: ['Warehouse storage', 'Domestic transport', 'Pallet stabilization', 'Retail distribution']
  },
  {
    id: 'corrugated-boxes',
    name: 'Corrugated Boxes',
    coreKeyword: 'corrugated box',
    features: ['High bursting strength', '3-ply to 7-ply options', 'Lightweight', 'Recyclable'],
    industries: ['E-commerce', 'Pharmaceuticals', 'FMCG', 'Consumer Appliances'],
    useCases: ['Retail packaging', 'Air cargo', 'Bulk unitization', 'Domestic courier']
  }
];

export const searchIntents = [
  'Manufacturer',
  'Supplier',
  'Dealer',
  'Export Packaging',
  'Industrial Packaging',
  'Near Me',
  'For Heavy Machinery',
  'For Warehouse',
  'For Export Cargo',
  'Price Guide',
  'Wholesale Supplier',
  'For Pharma Industry',
  'For Sea Shipment'
];

export const seoLocations: SeoLocation[] = [
  // Major Hubs & Industrial Areas
  { name: 'Mumbai', type: 'Mumbai Western', nearbyAreas: ['Thane', 'Navi Mumbai', 'Bhiwandi', 'Vasai'] },
  { name: 'Andheri', type: 'Mumbai Western', nearbyAreas: ['Marol', 'Saki Naka', 'SEEPZ', 'Chakala', 'Vile Parle'] },
  { name: 'Bhiwandi', type: 'Industrial Area', nearbyAreas: ['Kalyan', 'Thane', 'Mankoli', 'Padgha', 'Godown Zone'] },
  { name: 'Navi Mumbai', type: 'Navi Mumbai', nearbyAreas: ['Vashi', 'Turbhe', 'Mahape', 'TTC Industrial Area', 'JNPT'] },
  { name: 'JNPT', type: 'Port/Cargo', nearbyAreas: ['Nhava Sheva', 'Uran', 'Panvel', 'Navi Mumbai'] },
  { name: 'Mumbai Port', type: 'Port/Cargo', nearbyAreas: ['Mazagaon', 'Wadala', 'Colaba', 'CSMT'] },
  { name: 'Sahar Cargo', type: 'Port/Cargo', nearbyAreas: ['Andheri East', 'Vile Parle', 'Airport Road', 'Marol'] },
  { name: 'Vasai', type: 'Industrial Area', nearbyAreas: ['Vasai East', 'Naigaon', 'Virar', 'Pelhar', 'Nallasopara'] },
  { name: 'Thane', type: 'Mumbai Central', nearbyAreas: ['Wagle Estate', 'Mulund', 'Kalwa', 'Bhiwandi', 'Majiwada'] },
  { name: 'Turbhe MIDC', type: 'Industrial Area', nearbyAreas: ['Vashi', 'Sanpada', 'Mahape', 'Pawne'] },
  { name: 'Rabale MIDC', type: 'Industrial Area', nearbyAreas: ['Ghansoli', 'Mahape', 'Airoli', 'Koparkhairane'] },
  { name: 'Boisar', type: 'Industrial Area', nearbyAreas: ['Tarapur MIDC', 'Palghar', 'Vangaon', 'Dahanu'] },
  
  // Western Line
  { name: 'Vile Parle', type: 'Mumbai Western', nearbyAreas: ['Andheri', 'Santacruz', 'Sahar Cargo', 'Domestic Airport'] },
  { name: 'Goregaon', type: 'Mumbai Western', nearbyAreas: ['Malad', 'Jogeshwari', 'Dindoshi', 'Aarey'] },
  { name: 'Malad', type: 'Mumbai Western', nearbyAreas: ['Kandivali', 'Goregaon', 'Mindspace', 'Orlem'] },
  { name: 'Borivali', type: 'Mumbai Western', nearbyAreas: ['Kandivali', 'Dahisar', 'Magathane'] },
  { name: 'Lower Parel', type: 'Mumbai Western', nearbyAreas: ['Worli', 'Mahalaxmi', 'Dadar', 'Prabhadevi'] },
  
  // Central / Harbour Line
  { name: 'Kurla', type: 'Mumbai Central', nearbyAreas: ['Vidyavihar', 'Sion', 'BKC', 'Chunabhatti'] },
  { name: 'Ghatkopar', type: 'Mumbai Central', nearbyAreas: ['Vikhroli', 'Vidyavihar', 'Asalpha', 'Saki Naka'] },
  { name: 'Vashi', type: 'Navi Mumbai', nearbyAreas: ['Sanpada', 'Koparkhairane', 'Turbhe', 'APMC Market'] },
  { name: 'Panvel', type: 'Navi Mumbai', nearbyAreas: ['Khandeshwar', 'Taloja MIDC', 'Kalamboli', 'JNPT'] },
];

// Helper to get a rich localized context paragraph
export const getLocalContext = (loc: SeoLocation) => {
  return `Operating near ${loc.name}, businesses across ${loc.nearbyAreas.slice(0, 3).join(', ')}, and surrounding ${loc.type === 'Industrial Area' ? 'industrial belts' : 'commercial zones'} rely on robust packaging solutions to maintain their supply chain integrity.`;
};

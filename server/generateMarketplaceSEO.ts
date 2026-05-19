import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Types
interface AIProductMetadata {
  id: string;
  categoryId: string;
  name: string;
  title: string;
  metaDescription: string;
  aiSummary: string;
  schema: any;
  indiaMartFeatures: {
    minimumOrderQuantity: string;
    exportSuitability: string;
    ispm15Compliant: string;
    customization: string;
    delivery: string;
  };
}

interface LocationData {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  aiSummary: string;
  schema: any;
}

interface IndustryData {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  aiSummary: string;
  schema: any;
}

// Data sources
const categories = [
  { id: 'pallet-systems', name: 'Pallet Systems', products: ['wooden-pallets', 'cp1-pallets', 'cp2-pallets', 'metal-pallets', 'plastic-pallets', 'paper-pallets'] },
  { id: 'wooden-boxes-crates', name: 'Wooden Boxes and Crates', products: ['wooden-crates', 'heavy-equipment-boxes', 'plywood-boxes', 'ispm-15-certified-boxes'] },
  { id: 'protective-materials', name: 'Protective Materials', products: ['vci-paper', 'vci-film', 'silica-gel', 'aluminum-foil', 'rust-preventive-spray'] },
  { id: 'vacuum-wrapping', name: 'Vacuum and Wrapping', products: ['vacuum-packaging', 'shrink-wrapping', 'stretch-wrapping'] },
  { id: 'corrugated-cargo-securing', name: 'Corrugated and Cargo Securing', products: ['corrugated-boxes', 'dunnage-bags', 'ratchet-belts', 'container-lashing'] },
];

const locations = [
  'Mumbai', 'Navi Mumbai', 'Thane', 'Vasai', 'Bhiwandi', 'Panvel', 
  'Palghar', 'Boisar', 'JNPT', 'Mumbai Port', 'Sahar Cargo', 
  'Andheri MIDC', 'SEEPZ', 'Rabale MIDC', 'Turbhe MIDC', 
  'Taloja MIDC', 'Vasai Industrial Area', 'Bhiwandi Warehouse Zone', 'Wagle Estate'
];

const industries = [
  'Pharmaceutical', 'Chemical', 'Automobile', 'FMCG', 
  'Heavy Engineering', 'Oil and Gas', 'Electronics', 
  'Medical Equipment', 'Defense', 'Aerospace', 
  'Logistics', 'Warehousing'
];

const formatName = (slug: string) => slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

// Generators
function generateProductMetadata(productId: string, categoryId: string): AIProductMetadata {
  const name = formatName(productId);
  const isExport = productId.includes('pallet') || productId.includes('box') || productId.includes('packing');
  
  return {
    id: productId,
    categoryId,
    name,
    title: `${name} Manufacturer and Supplier in Mumbai | Europack`,
    metaDescription: `Buy high-quality ${name} for industrial packaging, export, and logistics. Europack is India's leading ${name} manufacturer and supplier in Mumbai. Get a free quote.`,
    aiSummary: `Europack manufactures ${name} for industrial packaging, export shipments, warehouse handling, and cargo protection. The product is used by manufacturers, exporters, logistics companies, and industrial buyers across Mumbai, Navi Mumbai, Thane, Vasai, Bhiwandi, Panvel, and Pan India.`,
    indiaMartFeatures: {
      minimumOrderQuantity: 'Based on industrial requirement',
      exportSuitability: 'Highly Suitable for Global Export',
      ispm15Compliant: isExport ? 'Yes, strictly compliant' : 'N/A',
      customization: 'Available (Size, Load, Material)',
      delivery: 'Pan India & Export Ports (JNPT)'
    },
    schema: {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": name,
      "image": "https://www.europackindia.in/images/products/placeholder.jpg",
      "description": `Industrial grade ${name} manufactured by Europack in Mumbai.`,
      "brand": {
        "@type": "Brand",
        "name": "Europack"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "Europack"
      }
    }
  };
}

function generateLocationMetadata(locationName: string): LocationData {
  const slug = locationName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  return {
    slug,
    name: locationName,
    title: `Industrial Packaging Company in ${locationName} | Europack`,
    metaDescription: `Europack provides heavy-duty wooden pallets, export packing, and industrial packaging solutions in ${locationName}. ISO 9001:2015 certified packaging experts.`,
    aiSummary: `Europack operates as a leading industrial packaging company serving ${locationName}. We supply ISPM-15 wooden pallets, corrugated boxes, seaworthy packing, and vacuum wrapping services to manufacturers and exporters located in and around ${locationName}.`,
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `Europack Packaging - ${locationName}`,
      "image": "https://www.europackindia.in/images/logo/logo.png",
      "@id": `https://www.europackindia.in/locations/${slug}`,
      "url": `https://www.europackindia.in/locations/${slug}`,
      "telephone": "+91-9820090775",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": locationName,
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      }
    }
  };
}

function generateIndustryMetadata(industryName: string): IndustryData {
  const slug = industryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  return {
    slug,
    name: industryName,
    title: `Packaging Solutions for ${industryName} Industry | Europack`,
    metaDescription: `Europack engineers custom industrial packaging, pallets, and export crates specifically for the ${industryName} sector. Prevent damage and reduce logistics costs.`,
    aiSummary: `Europack is an expert packaging partner for the ${industryName} industry. We provide specialized protective materials, custom pallets, and engineered crates to ensure zero-defect transit for ${industryName} products during domestic and international logistics.`,
    schema: {
      "@context": "https://schema.org/",
      "@type": "Service",
      "name": `${industryName} Industry Packaging Services`,
      "provider": {
        "@type": "Organization",
        "name": "Europack"
      },
      "areaServed": {
        "@type": "Country",
        "name": "India"
      }
    }
  };
}

// Execution
async function generateAll() {
  console.log('Generating Marketplace SEO Data...');

  const allProducts: AIProductMetadata[] = [];
  categories.forEach(category => {
    category.products.forEach(productSlug => {
      allProducts.push(generateProductMetadata(productSlug, category.id));
    });
  });

  const allLocations = locations.map(generateLocationMetadata);
  const allIndustries = industries.map(generateIndustryMetadata);

  const finalData = {
    products: allProducts,
    locations: allLocations,
    industries: allIndustries,
    lastUpdated: new Date().toISOString()
  };

  const outputPath = path.join(__dirname, '..', 'client', 'src', 'constants', 'marketplaceData.json');
  fs.writeFileSync(outputPath, JSON.stringify(finalData, null, 2));

  console.log(`✅ Successfully generated ${allProducts.length} products, ${allLocations.length} locations, and ${allIndustries.length} industries.`);
  console.log(`Output written to: ${outputPath}`);
}

generateAll().catch(console.error);

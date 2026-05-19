import blogIndex from '../constants/blogIndex.json';
import { seoProducts, seoLocations, getLocalContext } from '../constants/seoData';

export interface SeoBlogContent {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  introduction: string;
  benefits: { title: string; desc: string }[];
  tables: {
    specs: { label: string; value: string }[];
    useCases: { industry: string; application: string }[];
    coverage: string[];
  };
  faq: { q: string; a: string }[];
  schema: any;
  bannerPrompt: string;
  cardPrompt: string;
  imageAlt: string;
}

// ---------------------------------------------------------
// 1. DETERMINISTIC HASH FUNCTION
// ---------------------------------------------------------
function getHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// ---------------------------------------------------------
// 2. CONTENT POOLS
// ---------------------------------------------------------
const introPools = [
  // 1. Warehouse / Logistics Focus
  (location: any, product: any, context: string) => `Many businesses operating in and around ${location.name} require robust, fail-proof industrial packaging to ensure their goods reach domestic and international markets without damage. Whether you are shipping out of ${location.nearbyAreas[0] || 'local industrial zones'} or managing a warehouse near ${location.nearbyAreas[1] || 'nearby hubs'}, selecting the right ${product.coreKeyword} is critical to your logistics success. \n\n${context} Europack brings over 33 years of manufacturing expertise to provide highly engineered ${product.name.toLowerCase()} tailored to the precise requirements of exporters, heavy machinery manufacturers, and logistics companies in the region.`,
  
  // 2. Export / Customs Focus
  (location: any, product: any, context: string) => `For companies in ${location.name} involved in global trade, standard packaging is often not enough to survive rigorous customs checks and long sea transit. Cargo moving through zones like ${location.nearbyAreas[0] || 'nearby ports'} demands export-grade ${product.coreKeyword}. \n\n${context} By utilizing Europack's specialized ${product.name.toLowerCase()}, businesses can completely eliminate the risk of rejection at international ports due to compliance failures, ensuring seamless transit and zero damage to high-value goods.`,
  
  // 3. Heavy Machinery / Industrial Focus
  (location: any, product: any, context: string) => `Heavy engineering and manufacturing units near ${location.name} face unique challenges when dispatching oversized or delicate machinery. Standardized packing methods often fail under heavy dynamic loads. The solution lies in customized ${product.coreKeyword} designed specifically for industrial weights. \n\n${context} Europack is the leading supplier of ${product.name.toLowerCase()} in the ${location.nearbyAreas[1] || 'surrounding'} belt, offering custom dimensions, superior structural integrity, and ISO-certified manufacturing that Fortune 500 companies rely on.`,
  
  // 4. Cost Optimization / Bulk Procurement Focus
  (location: any, product: any, context: string) => `Procurement managers in ${location.name} are constantly balancing packaging costs against the risk of transit damage. Investing in cheap, non-compliant packaging often leads to catastrophic losses during transport to areas like ${location.nearbyAreas[0] || 'local hubs'}. \n\n${context} Europack provides the perfect balance with our wholesale supply of ${product.name.toLowerCase()}. Engineered for maximum durability while keeping bulk costs low, our ${product.coreKeyword} ensure that your bottom line is protected just as securely as your products.`,
  
  // 5. Pharmaceutical & FMCG Safety Focus
  (location: any, product: any, context: string) => `In sectors like Pharmaceuticals, Chemicals, and FMCG operating out of ${location.name}, contamination, moisture, and handling impacts are major threats. To combat these, highly sterile and shock-absorbent ${product.coreKeyword} are legally and practically required. \n\n${context} Europack’s specialized ${product.name.toLowerCase()} provide weather-proof, tamper-evident, and structurally sound protection. We ensure that your sensitive cargo leaves ${location.nearbyAreas[0] || 'your facility'} and reaches the end consumer in absolute pristine condition.`
];

const subtitlePools = [
  (productName: string) => `Enterprise-grade ${productName} engineered for precision and global compliance.`,
  (productName: string) => `Heavy-duty ${productName} solutions for domestic transport and international export.`,
  (productName: string) => `Premium ${productName} trusted by Fortune 500 manufacturers and logistics leaders.`,
  (productName: string) => `Customizable, ISPM-15 compliant ${productName} for absolute cargo safety.`,
  (productName: string) => `The ultimate ${productName} choice for zero-damage transit and secure warehousing.`
];

const benefitDescPools = [
  (feature: string) => `Our solutions incorporate ${feature.toLowerCase()} to ensure maximum safety and compliance for your supply chain operations.`,
  (feature: string) => `By leveraging ${feature.toLowerCase()}, we guarantee that your cargo will survive the toughest transit conditions across the globe.`,
  (feature: string) => `The inclusion of ${feature.toLowerCase()} allows us to offer superior quality that meets rigorous international export standards.`,
  (feature: string) => `Our engineering team focuses on ${feature.toLowerCase()} to reduce your packaging costs while maximizing structural integrity.`,
  (feature: string) => `Designed with ${feature.toLowerCase()} at the core, these products actively prevent moisture damage and physical impact during handling.`
];

// ---------------------------------------------------------
// 3. DYNAMIC FAQ GENERATOR
// ---------------------------------------------------------
function generateDynamicFAQs(product: any, location: any, hash: number) {
  const masterFaqs = [
    { q: `Where can I buy ${product.name.toLowerCase()} in ${location.name}?`, a: `Europack is the leading supplier of ${product.name.toLowerCase()} in ${location.name}. We actively serve businesses across ${location.nearbyAreas.join(', ')} with priority delivery.` },
    { q: `Are your ${product.name.toLowerCase()} suitable for export?`, a: `Yes, absolutely. Our ${product.name.toLowerCase()} are designed for international shipping, fully compliant with export standards including ISPM-15 certification for wooden products.` },
    { q: `Do you supply ${product.name.toLowerCase()} for the ${product.industries[0]} industry?`, a: `Yes, we have specialized packaging solutions tailored specifically for the ${product.industries[0]} industry, addressing their unique safety and compliance requirements.` },
    { q: `How do I get a price quote for ${product.name.toLowerCase()} near ${location.name}?`, a: `You can instantly request a quote by calling our ${location.name} dispatch team or filling out the inquiry form below. We provide wholesale rates for bulk industrial orders.` },
    { q: `What is the load capacity of your ${product.name.toLowerCase()}?`, a: `Our ${product.name.toLowerCase()} are built for heavy-duty industrial applications. We customize the structural integrity based on whether you are shipping light goods or heavy machinery.` },
    { q: `Do you deliver to ${location.nearbyAreas[0] || 'surrounding areas'}?`, a: `Yes, our logistics network covers ${location.name} completely, ensuring rapid delivery to industrial zones in ${location.nearbyAreas[0] || 'the region'} and beyond.` },
    { q: `Why choose Europack for ${product.name.toLowerCase()} in Mumbai?`, a: `With over 33+ years of experience and 3000+ industrial clients, Europack guarantees zero-damage transit, ISO 9001:2015 quality, and rapid turnaround times for all packaging needs.` },
    { q: `Can the ${product.name.toLowerCase()} be customized to our product size?`, a: `Yes, we manufacture bespoke packaging dimensions. Whether you are shipping oversized ODC cargo or precision electronics, we design the exact fit.` },
    { q: `Do you handle urgent bulk orders for ${product.name.toLowerCase()} in ${location.name}?`, a: `Yes, we have a rapid-response manufacturing facility that can fulfill urgent bulk orders to ${location.name} to ensure your supply chain never stops.` },
    { q: `How do you ensure the quality of your ${product.name.toLowerCase()}?`, a: `Every batch goes through stringent QA checks for structural strength, moisture content, and dimensional accuracy before being dispatched to ${location.name}.` },
    { q: `Are your ${product.name.toLowerCase()} weather-resistant?`, a: `We offer specific treatments, wraps, and linings that make our ${product.name.toLowerCase()} highly resistant to monsoon moisture, sea salt, and extreme transit weather.` },
    { q: `What industries in ${location.name} buy your ${product.name.toLowerCase()}?`, a: `We primarily supply to Heavy Engineering, Pharmaceuticals, Automotive components, FMCG, and Logistics companies operating in and around ${location.name}.` }
  ];

  const selectedFaqs = [];
  let tempHash = hash;
  const availableFaqs = [...masterFaqs];
  
  // Pick exactly 8 FAQs deterministically
  for(let i=0; i<8; i++) {
    if(availableFaqs.length === 0) break;
    const index = tempHash % availableFaqs.length;
    selectedFaqs.push(availableFaqs[index]);
    availableFaqs.splice(index, 1);
    tempHash = Math.floor(tempHash / 3) + (hash * (i + 1)); // Scramble hash for next pick
  }
  
  return selectedFaqs;
}

// ---------------------------------------------------------
// 4. MAIN GENERATOR LOGIC
// ---------------------------------------------------------
export function generateSeoBlogContent(slug: string): SeoBlogContent | null {
  const blog = blogIndex.find((b: any) => b.slug === slug);
  if (!blog) return null;

  const product = seoProducts.find(p => p.name === blog.product);
  let location = seoLocations.find(l => l.name === blog.location);

  if (!location) {
    location = {
      name: blog.location,
      type: 'Industrial Area',
      nearbyAreas: ['Mumbai', 'Navi Mumbai', 'Thane', 'Surrounding Industrial Zones']
    };
  }

  if (!product) return null;

  // Generate cryptographic-style stable hash from URL
  const hash = getHash(slug);

  const localContext = getLocalContext(location);

  const getHeroImage = () => {
    // Use deterministic image path based on slug hash to ensure uniqueness
    const hash = getHash(slug);
    const imgIndex = hash % 5;
    const imgMap = [
      '/images/blog/wooden-pallets.png',
      '/images/blog/seaworthy-packing.png',
      '/images/blog/wooden-crates.png',
      '/images/blog/shrink-wrapping.png',
      '/images/blog/corrugated-boxes.png'
    ];
    return imgMap[imgIndex];
  };

  const getBannerPrompt = (product: any, location: any, angle: string) => `Photorealistic industrial banner of ${product.name} being prepared for transport in ${location.name}, ${angle}, 8k resolution, professional lighting.`;
  const getCardPrompt = (product: any, location: any) => `High quality close-up shot of ${product.name} showing industrial texture, professional studio lighting, depth of field.`;

  const metaTitle = blog.title;
  const metaDescription = `Looking for ${product.name} ${blog.intent.toLowerCase()} near ${location.name}? Europack delivers premium industrial packaging solutions across ${location.nearbyAreas.join(', ')}. Get a quote today!`;

  // Select completely unique content pieces based on hash
  const introIndex = hash % introPools.length;
  const subtitleIndex = (hash + 1) % subtitlePools.length;

  return {
    meta: {
      title: metaTitle,
      description: metaDescription,
      keywords: `${product.coreKeyword} ${location.name}, ${blog.intent} ${product.name} Mumbai, industrial packaging ${location.name}`
    },
    bannerPrompt: getBannerPrompt(product, location, 'wide angle'),
    cardPrompt: getCardPrompt(product, location),
    imageAlt: `Industrial ${product.name} in ${location.name}`,
    hero: {
      title: blog.title,
      subtitle: subtitlePools[subtitleIndex](product.name.toLowerCase()),
      image: getHeroImage()
    },
    introduction: introPools[introIndex](location, product, localContext),
    benefits: product.features.map((f, i) => ({
      title: f,
      desc: benefitDescPools[(hash + i) % benefitDescPools.length](f)
    })),
    tables: {
      specs: [
        { label: 'Product Type', value: product.name },
        { label: 'Primary Use', value: product.useCases[(hash) % product.useCases.length] },
        { label: 'Export Compliant', value: 'Yes (International ISPM-15 Standards)' },
        { label: 'Customization', value: '100% Bespoke Dimensions Available' },
        { label: 'Target Industries', value: product.industries.join(', ') }
      ],
      useCases: product.useCases.map((uc, i) => ({
        industry: product.industries[(hash + i) % product.industries.length],
        application: uc
      })),
      coverage: [location.name, ...location.nearbyAreas, 'Pan India Delivery', 'All Major Indian Cities']
    },
    faq: generateDynamicFAQs(product, location, hash),
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": metaTitle,
      "description": metaDescription,
      "publisher": {
        "@type": "Organization",
        "name": "Europack",
        "logo": {
          "@type": "ImageObject",
          "url": "https://europack.in/images/europack-logo.png"
        }
      }
    }
  };
}

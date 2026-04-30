export interface ServiceData {
  slug: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  img: string;
  icon?: string;
  benefits: string[];
  features: string[];
  applications?: string[];
  faqs?: { question: string; answer: string }[];
}

export const servicesData: ServiceData[] = [
  {
    slug: 'crate-packing',
    name: 'Crate Packing',
    shortDesc: 'Custom ISPM-15 wooden crates for heavy machinery.',
    longDesc: 'Our structural crating systems are custom-engineered for multi-ton heavy machinery. Using CNC precision and ISPM-15 certified wood, we ensure your cargo survives the most rigorous global logistics routes. We provide tailored solutions ranging from open-slat crates for standard shipments to fully enclosed heavy-duty boxes for delicate engineering components.',
    img: '/images/services/crate_premium.png',
    benefits: [
      'ISPM-15 Compliance for global export without delays.',
      'Custom CNC cut bracing to completely immobilize cargo.',
      'High strength-to-weight ratio for optimal freight costs.',
      'Shock dampening bases for sensitive electronics.'
    ],
    features: [
      'Heavy Duty Hardwood / Pinewood construction',
      'Galvanized steel bolted latches',
      'Internal VCI lining integration',
      'Structural load-bearing skids'
    ]
  },
  {
    slug: 'stretch-wrapping',
    name: 'Stretch Wrapping',
    shortDesc: 'Automated pallet unitisation for load stability.',
    longDesc: 'Stretch wrapping is critical for load unitisation and stability during transit. We provide high-performance LLDPE stretch wrapping services that protect cargo from dust, moisture, and pilferage while ensuring pallet loads remain completely stable under dynamic transport forces.',
    img: '/images/services/grid/stretch_wrapping.png',
    benefits: [
      'Prevents cargo shifting during sudden stops.',
      'Protects against surface abrasions and dust.',
      'Cost-effective load stabilization.',
      'Clear visibility for barcode scanning and inspections.'
    ],
    features: [
      'Multi-layer wrap for high puncture resistance',
      'Machine and manual application',
      'UV-resistant options for outdoor storage',
      'Tension-optimized to prevent product crushing'
    ]
  },
  {
    slug: 'vacuum-packing',
    name: 'Vacuum Packing',
    shortDesc: 'Moisture-proof aluminum barrier foil sealing.',
    longDesc: 'Precision electronics, unpainted metal surfaces, and sensitive machinery require absolute protection from ambient moisture and salt-laden sea air. Our vacuum packing process uses multi-layer aluminum barrier foils, combined with active desiccants, to create a hermetically sealed, zero-moisture micro-environment.',
    img: '/images/products/user_vacuum_packing.png',
    benefits: [
      'Zero corrosion risk during long sea freight.',
      'Protection against mold, mildew, and fungi.',
      'Maintains factory-calibration of sensitive parts.',
      'Long-term storage capability (up to 5 years).'
    ],
    features: [
      'PET/ALU/PE Triplex barrier foil',
      'Integrated desiccant calculation (Silica/Clay)',
      'Vacuum extraction & heat sealing',
      'Humidity indicator cards included'
    ]
  },
  {
    slug: 'anti-rust-treatment',
    name: 'Anti-Rust Treatment',
    shortDesc: 'VCI film and chemical corrosion protection.',
    longDesc: 'Our comprehensive anti-rust treatments protect bare metal components from the harsh realities of global shipping. By utilizing Volatile Corrosion Inhibitor (VCI) technology and barrier coatings, we prevent oxidation at a molecular level without leaving messy grease or oil residues.',
    img: '/images/products/user_anti_rust.png',
    benefits: [
      'Eliminates the need for grease coating and degreasing.',
      'Active molecules reach even recessed cavities.',
      'Ready-to-use parts directly out of packaging.',
      'Safe, eco-friendly, and non-toxic.'
    ],
    features: [
      'VCI Papers and Poly Bags',
      'Rust preventive aerosol sprays',
      'VCI Emitters for large enclosures',
      'Multi-metal protection chemistry'
    ]
  },
  {
    slug: 'container-lashing-stuffing',
    name: 'Container Lashing & Stuffing',
    shortDesc: 'High-tension securing and optimized container loading.',
    longDesc: 'Improper cargo securing is a leading cause of transit damage. Our certified lashing teams perform expert container stuffing, choking, and high-tension lashing to secure Over-Dimensional Cargo (ODC) and standard pallets. We ensure zero cargo shift even under extreme oceanic pitching and rolling.',
    img: '/images/home/ocean_lashing.png',
    benefits: [
      'Zero-shift guarantee during sea and rail transit.',
      'Maximized container space utilization.',
      'Compliance with international CTU Code standards.',
      'Detailed lashing certificates and photographic proof.'
    ],
    features: [
      'Heavy-duty steel wire rope lashing',
      'Grade 80 alloy chain securing',
      'Custom wooden dunnage and choking',
      'Ratchet belts for standard loads'
    ]
  },
  {
    slug: 'shrink-wrapping',
    name: 'Shrink Wrapping',
    shortDesc: 'Heavy-duty thermowrap for weather protection.',
    longDesc: 'For massive structures, boats, and heavy machinery that cannot be boxed, industrial shrink wrapping provides a drum-tight, weather-proof skin. Our heavy-duty LDPE shrink films are heat-shrunk to contour perfectly to the cargo, providing an impenetrable barrier against wind, rain, and UV rays.',
    img: '/images/products/user_shrink_wrapping_process.png',
    benefits: [
      'Complete weatherproofing for open-deck sea freight.',
      'Significantly lighter and cheaper than wooden enclosures.',
      'UV inhibitors prevent sun damage during storage.',
      'Vented options prevent internal condensation.'
    ],
    features: [
      '200+ micron industrial-grade film',
      'Proprietary heat-welding techniques',
      'Zipper access doors for customs inspection',
      'Padded sharp-edge protection'
    ]
  },
  {
    slug: 'fumigation',
    name: 'Fumigation',
    shortDesc: 'ISPM-15 compliant pest eradication for wood packaging.',
    longDesc: 'International phytosanitary regulations strictly mandate that all solid wood packaging be treated to prevent the spread of invasive pests. Our ISPM-15 compliant fumigation and heat treatment services ensure your cargo crosses international borders seamlessly, avoiding costly rejections or delays.',
    img: '/images/products/ispm-15-certified-pinewood-boxes-for-export-cargo-shipping.png',
    benefits: [
      '100% compliance with global ISPM-15 import regulations.',
      'Eradicates all wood-boring insects and larvae.',
      'Official IPPC stamping and certification provided.',
      'Fast turnaround for urgent shipments.'
    ],
    features: [
      'Controlled Heat Treatment (HT) chambers',
      'Methyl Bromide (MB) fumigation where required',
      'Detailed treatment certificates',
      'Pre-export compliance auditing'
    ]
  },
  {
    slug: 'palletization',
    name: 'Palletization',
    shortDesc: 'Systematic cargo consolidation on specialized pallets.',
    longDesc: 'Efficient palletization is the backbone of modern logistics. We systematically consolidate your cartons, bags, drums, or loose items onto appropriately specified pallets, securing them with strapping, stretch wrap, and edge protectors to create a unified, forklift-ready cargo block.',
    img: '/images/products/Complete-Palletization.webp',
    benefits: [
      'Dramatically speeds up loading and unloading times.',
      'Reduces individual package handling and damage.',
      'Optimizes warehouse storage and container volume.',
      'Enhances overall supply chain efficiency.'
    ],
    features: [
      'Euro, Standard, and Custom pallet sizes',
      'PET and Steel strapping',
      'Corner board protection',
      'Weight distribution optimization'
    ]
  },
  {
    slug: 'on-site-packing',
    name: 'On-Site Packing & Execution',
    shortDesc: 'Mobile deployment teams for factory-side packing.',
    longDesc: 'When machinery is too large, sensitive, or confidential to move unprotected, we bring our packaging facility to you. Our mobile deployment teams execute complete packaging, crating, lashing, and stuffing directly at the customer site, vendor site, or port.',
    img: '/images/products/user_heavy_engineering_packing.jpg',
    benefits: [
      'Eliminates the risk of transporting unprotected cargo.',
      'Reduces logistical handling steps.',
      'Allows direct supervision by your engineering team.',
      'Flexible deployment schedules to match production.'
    ],
    features: [
      'Fully equipped mobile packing units',
      'Trained and insured packing technicians',
      'On-site custom fabrication of bases and crates',
      'Port-side lashing operations'
    ]
  }
];

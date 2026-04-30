export const mockBlogs = {
  'ispm-15-complete-guide': {
    _id: 'mock-1',
    title: 'The Essential Guide to ISPM-15 Heat-Treated Packaging',
    subtitle: 'Everything you need to know about phytosanitary standards to ensure your cargo clears international borders without rejection.',
    slug: 'ispm-15-complete-guide',
    heroImage: '/images/banners/1.png',
    altText: 'Industrial Heat Treated Crates',
    category: 'Compliance',
    author: 'Dhanik Chheda',
    status: 'published',
    createdAt: new Date().toISOString(),
    typography: {
      title: { fontSize: '4rem', fontWeight: '900', fontFamily: 'Inter', color: '#1A1F2C' },
      subtitle: { fontSize: '1.25rem', fontWeight: '500', fontFamily: 'Inter', color: '#444' },
      paragraph: { fontSize: '1.1rem', lineHeight: '1.8', fontFamily: 'Inter', color: '#333' }
    },
    contentBlocks: [
      { type: 'paragraph', content: { text: "In the world of international logistics, the ISPM-15 stencil is more than just a mark; it is a mandatory license for global transit. Established by the International Plant Protection Convention (IPPC), these regulations are designed to prevent the international spread of pests and diseases through wood packaging materials (WPM)." } },
      { type: 'heading', content: { level: 'h2', text: 'Why ISPM-15 Matters for Your Shipments' } },
      { type: 'paragraph', content: { text: "Failure to comply with ISPM-15 standards is one of the leading causes of shipment delays and rejections at destination ports. If your wooden packaging—including crates, pallets, and dunnage—is not properly treated and marked, customs authorities have the right to quarantine the cargo, refuse entry, or even order its immediate destruction at the exporter's expense." } },
      { type: 'image', content: { url: '/images/banners/banner_main.png', caption: 'Certified heat-treatment facility processing raw timber for export crates.' } },
      { type: 'heading', content: { level: 'h3', text: 'The Treatment Process: HT vs. MB' } },
      { type: 'paragraph', content: { text: "There are two primary methods approved for ISPM-15 compliance: Heat Treatment (HT) and Methyl Bromide (MB) Fumigation. At Europack, we exclusively use HT for environmental safety and superior moisture control." } },
      { type: 'list', content: { items: [
        "Heat Treatment (HT): Wood is heated until its core reaches 56°C for at least 30 minutes. This method is chemical-free and reduces moisture content.",
        "Dielectric Heating (DH): A newer form of heat treatment using microwaves or radio waves to reach the required core temperature.",
        "Methyl Bromide (MB): Fumigation using a toxic gas. This method is being phased out in many countries due to its ozone-depleting properties."
      ] } },
      { type: 'heading', content: { level: 'h2', text: 'The ISPM-15 Mark: Decoding the Stamp' } },
      { type: 'paragraph', content: { text: "Every compliant piece of wood packaging must carry a permanently applied mark. This mark usually consists of the IPPC 'Wheat' symbol, the ISO country code (e.g., IN for India), a unique producer code, and the treatment abbreviation (HT)." } },
      { type: 'cta', content: { text: "Get Certified ISPM-15 Crating", link: "/contact" } }
    ],
    seo: { metaTitle: 'Mastering ISPM-15: The Complete Guide' },
    analytics: { views: 1240, readTime: 6 }
  },
  'post=3883': {
    _id: 'mock-2',
    title: 'The Physics of Ocean Lashing: Achieving Zero Cargo Shift',
    subtitle: 'Advanced structural engineering strategies to secure heavy ODC machinery for international sea freight.',
    slug: 'post=3883',
    heroImage: '/images/banners/2.png',
    altText: 'Heavy Machinery Lashing Operations',
    category: 'Technical',
    author: 'Jayant Ghadge',
    status: 'published',
    createdAt: new Date().toISOString(),
    typography: {
      title: { fontSize: '4.5rem', fontWeight: '900', fontFamily: 'Outfit', color: '#1A1F2C' },
      subtitle: { fontSize: '1.5rem', fontWeight: '500', fontFamily: 'Outfit', color: '#444' },
      paragraph: { fontSize: '1.15rem', lineHeight: '1.8', fontFamily: 'Inter', color: '#333' }
    },
    contentBlocks: [
      {
        type: 'paragraph',
        content: { text: "Ocean transit is a brutal environment for heavy machinery. When a vessel encounters high sea states, the acceleration forces acting on a multi-ton unit can exceed its own weight by 200%. Without precision-engineered lashing, cargo shift is inevitable, often leading to total loss." }
      },
      {
        type: 'image',
        content: { 
          url: '/images/banners/banner_action.png', 
          alt: "Heavy machinery secured on a flat rack container",
          caption: "Precision lashing points for a 45-ton turbine unit." 
        }
      },
      {
        type: 'heading',
        content: { level: 'h2', text: "Critical Lashing Fundamentals" }
      },
      {
        type: 'paragraph',
        content: { text: "At Europack, we use a three-tier lashing protocol to ensure absolute stability. Every lashing plan begins with a structural analysis of the cargo's center of gravity and the vessel's metacentric height." }
      },
      {
        type: 'list',
        content: {
          items: [
            "Tie-Down Lashing: Prevents vertical movement and increases friction coefficients.",
            "Direct Lashing: Counteracts horizontal longitudinal and transverse forces.",
            "Loop Lashing: Used for cylindrical units to prevent rolling and sliding.",
            "Spring Lashing: Dampens vibration and absorbs sudden impact shocks."
          ]
        }
      },
      {
        type: 'heading',
        content: { level: 'h2', text: "Engineering for Sea States 7-9" }
      },
      {
        type: 'paragraph',
        content: { text: "Standard lashing plans often fail when facing extreme weather. Our advanced approach incorporates high-tension polyester strapping and steel wire combinations, rated for forces encountered in the North Atlantic and Pacific routes." }
      },
      {
        type: 'cta',
        content: {
          text: "Get a Technical Lashing Audit",
          link: "/contact"
        }
      },
      {
        type: 'link',
        content: {
          text: "Explore Our Full Range of Heavy-Duty Crating Solutions",
          url: "/products",
          newTab: false
        }
      },
      {
        type: 'paragraph',
        content: { text: "Conclusion: Zero shift is not an accident; it's an engineering achievement. By combining high-fidelity materials with structural lashing math, Europack ensures your critical assets arrive in factory-new condition, regardless of the journey's intensity." }
      }
    ],
    seo: { 
      metaTitle: 'Ocean Lashing Engineering | Europack Technical Insights',
      metaDescription: 'Discover the technical science behind securing ODC machinery for sea freight. Learn about tension calculations and zero-shift strategies for sea state 9.'
    },
    analytics: { views: 2450, readTime: 8 }
  },
  'vci-packaging-metal-protection': {
    _id: 'mock-3',
    title: 'VCI Packaging: How to Protect Ferrous Metals from Corrosion',
    subtitle: 'Advanced molecular protection for sensitive industrial components during long-haul sea transit.',
    slug: 'vci-packaging-metal-protection',
    heroImage: '/images/banners/3.png',
    altText: 'VCI Packaging Protection',
    category: 'Innovation',
    author: 'Snehal Chheda',
    status: 'published',
    createdAt: new Date().toISOString(),
    typography: {
      title: { fontSize: '4rem', fontWeight: '900', fontFamily: 'Inter', color: '#1A1F2C' },
      subtitle: { fontSize: '1.25rem', fontWeight: '500', fontFamily: 'Inter', color: '#444' },
      paragraph: { fontSize: '1.1rem', lineHeight: '1.8', fontFamily: 'Inter', color: '#333' }
    },
    contentBlocks: [
      { type: 'paragraph', content: { text: `Volatile Corrosion Inhibitors (VCI) represent a breakthrough in metallurgical protection. These specialized compounds release protective molecules into the enclosed atmosphere of a package, creating an invisible, molecular-thin layer on all metal surfaces.` } },
      { type: 'heading', content: { level: 'h2', text: 'The Science of Molecular Protection' } },
      { type: 'paragraph', content: { text: `Unlike traditional oils or greases that require physical contact, VCI molecules migrate through the air to reach every nook, cranny, and recessed area of a complex component. This "molecular migration" ensures 100% surface protection, even for internal gears and blind holes.` } },
      { type: 'image', content: { url: '/images/banners/banner_main.png', caption: 'Aluminum barrier foil combined with VCI emitters for multi-year protection.' } },
      { type: 'heading', content: { level: 'h3', text: 'Key Advantages of VCI Systems' } },
      { type: 'list', content: { items: [
        "No Degreasing Required: Parts are ready for assembly immediately upon arrival, saving hours of labor.",
        "Multi-Metal Protection: Engineered to protect ferrous, non-ferrous, and galvanized metals simultaneously.",
        "Long-Term Stability: Provides up to 2 years of active protection when used in a sealed environment.",
        "Safe & Recyclable: Most VCI films are non-toxic and can be recycled like standard LDPE."
      ] } },
      { type: 'heading', content: { level: 'h2', text: 'Application Strategy' } },
      { type: 'paragraph', content: { text: "For maximum efficacy, VCI should be used in conjunction with a moisture barrier. At Europack, we recommend our 'Dual-Layer' approach: VCI film for primary protection, followed by a hermetically sealed aluminum foil bag with desiccants for long-term ocean transit." } }
    ],
    seo: { metaTitle: 'VCI Protection Guide | Europack' },
    analytics: { views: 750, readTime: 5 }
  },
  'choosing-right-export-box': {
    _id: 'mock-4',
    title: 'Corrugated vs. Plywood vs. Solid Wood: Choosing Your Export Box',
    subtitle: 'A structural comparison of packaging materials based on weight, destination rules, and cargo sensitivity.',
    slug: 'choosing-right-export-box',
    heroImage: '/images/banners/4.png',
    altText: 'Export Packaging Materials',
    category: 'Materials',
    author: 'Engineering Team',
    status: 'published',
    createdAt: new Date().toISOString(),
    typography: {
      title: { fontSize: '4.5rem', fontWeight: '900', fontFamily: 'Outfit', color: '#1A1F2C' },
      subtitle: { fontSize: '1.25rem', fontWeight: '500', fontFamily: 'Outfit', color: '#1A1F2C' },
      paragraph: { fontSize: '1.1rem', lineHeight: '1.8', fontFamily: 'Outfit', color: '#333' }
    },
    contentBlocks: [
      { type: 'paragraph', content: { text: `Choosing the right export box is a critical decision that impacts shipping costs, product safety, and regulatory compliance. The choice often depends on the weight of the cargo, the mode of transport (Air vs. Sea), and the destination's phytosanitary requirements.` } },
      { type: 'heading', content: { level: 'h2', text: 'Material Comparison Matrix' } },
      { type: 'list', content: { items: [
        "Solid Wood (Crates): Maximum structural integrity. Ideal for multi-ton machinery and ODC cargo. Requires ISPM-15 treatment.",
        "Plywood Boxes: Superior moisture resistance and smooth internal surfaces. Best for electronics and precision tools. ISPM-15 exempt in many jurisdictions.",
        "Heavy-Duty Corrugated (7-Ply): Lightweight and cost-effective. Excellent for air freight where every gram counts. Best for components under 500kg."
      ] } },
      { type: 'image', content: { url: '/images/banners/banner_main.png', caption: 'Custom-engineered plywood box designed for high-value medical electronics.' } },
      { type: 'heading', content: { level: 'h3', text: 'Optimization for Air Freight' } },
      { type: 'paragraph', content: { text: "When shipping via air, weight is the primary cost driver. Our engineering team often utilizes hybrid designs—using a solid wood base for structural support and a lightweight corrugated or plywood sleeve—to provide maximum protection with minimum weight." } }
    ],
    seo: { metaTitle: 'Choosing Export Box Materials | Europack' },
    analytics: { views: 1100, readTime: 7 }
  }
};

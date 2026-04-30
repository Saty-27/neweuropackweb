export interface Product {
  id: string;
  name: string;
  subTitle: string;
  img: string;
  specs: string[];
}

export interface SubCategory {
  title: string;
  products: Product[];
}

export interface Category {
  id: string;
  title: string;
  img: string;
  iconName: string;
  desc: string;
  subCategories: SubCategory[];
}

export const productsData: Category[] = [
  {
    id: "wooden-pallets",
    title: "Wooden Pallets",
    img: "/images/products/four-way-pallets.webp",
    iconName: "Box",
    desc: "Precision-engineered ISPM-15 heat-treated pallets for global heavy-duty logistics.",
    subCategories: [
      {
        title: "Standard Pallets",
        products: [
          { id: "euro-pallets", name: "Euro Pallets", subTitle: "800 x 1200 mm Standard", img: "/images/products/user_wooden_pallet.webp", specs: ["ISPM-15 Heat Treated", "Load: 1500kg Dynamic", "EPAL Certified", "Standardized Dimensions", "Four-Way Entry"] },
          { id: "two-way-pallet", name: "Two Way Pallets", subTitle: "Heavy Load Longitudinal", img: "/images/products/two-way-pallets.jpeg", specs: ["Dual Loading Direction", "High Static Support", "Pine or Hardwood", "Custom Load Specs", "Ideal for Racking"] },
          { id: "four-way-pallet", name: "Four Way Pallets", subTitle: "Uni-directional Entry", img: "/images/products/four-way-pallets.webp", specs: ["All-Side Forklift Entry", "Maximized Storage Flow", "Pine / Rubberwood", "Reinforced Block Design", "Export Ready"] },
          { id: "hardwood-pallet", name: "Hardwood Pallets", subTitle: "Maximum Structural Strength", img: "/images/products/hardwood-pallets.jpg", specs: ["Dense Jungle Wood", "Heavy Machinery Grade", "Extreme Durability", "Screw-Nail Fastened", "Low Moisture Content"] },
        ]
      },
      {
        title: "Chemical Pallets (CP Series)",
        products: [
          { id: "cp1", name: "CP1 Pallet", subTitle: "1000 x 1200 mm", img: "/images/products/user_cp1_pallets.webp", specs: ["Chemical Industry Standard", "Peripheral Deck", "Safe for Bagged Goods", "ISPM-15 Compliant", "Stackable Design"] },
          { id: "cp2", name: "CP2 Pallet", subTitle: "800 x 1200 mm", img: "/images/products/user_cp2_pallets.webp", specs: ["Euro Standard Size", "Euro-Pallet Variant", "Robust Construction", "Safe Cargo Transit", "Industry Certified"] },
          { id: "cp3", name: "CP3 Pallet", subTitle: "1140 x 1140 mm", img: "/images/products/user_cp3_pallets.webp", specs: ["Container-Optimized", "Ideal for Drums", "Stable Loading Base", "High Puncture Resistance", "Global Shipping Grade"] },
          { id: "cp4", name: "CP4 Pallet", subTitle: "1140 x 1140 mm (Peripheral)", img: "/images/products/user_cp4_pallets.webp", specs: ["Bagged Goods Support", "No Sharp Edges", "Smooth Decking", "ISPM-15 Certified", "Refined Wood Finish"] },
          { id: "cp5", name: "CP5 Pallet", subTitle: "760 x 1140 mm", img: "/images/products/user_cp5_pallets.webp", specs: ["Small Format Bags", "Standard CP Design", "High Unitization", "Treated Timber", "Global Acceptability"] },
          { id: "cp6", name: "CP6 Pallet", subTitle: "1200 x 1000 mm (Double)", img: "/images/products/user_cp6_pallets.webp", specs: ["Double Deck Design", "Maximum Rigidity", "High Stack Loading", "Chemical Grade", "Export Compliant"] },
          { id: "cp7", name: "CP7 Pallet", subTitle: "1300 x 1100 mm", img: "/images/products/user_cp7_pallets.webp", specs: ["Extra Wide Base", "Oversized Bags", "Stable Footing", "ISPM-15 Pine", "Precision Sized"] },
          { id: "cp8", name: "CP8 Pallet", subTitle: "1140 x 1140 mm (Drilled)", img: "/images/products/user_cp8_pallets.webp", specs: ["Drum Discharge Design", "High Strength", "Solid Perimeter", "Chemical Safe", "ISPM-15 HT"] },
          { id: "cp9", name: "CP9 Pallet", subTitle: "1140 x 1140 mm (Elite)", img: "/images/products/user_cp9_pallets.webp", specs: ["Full Peripheral Base", "Max Stability", "Elite CP Quality", "Stacking Friendly", "International Export"] },
        ]
      },
      {
        title: "Special Pallets",
        products: [
          { id: "plywood-pallet", name: "Plywood Pallets", subTitle: "Splinter-Free Surface", img: "/images/products/plywood-pallets.webp", specs: ["No ISPM-15 Required", "Lighter Weight", "Hygienic Surface", "Ideal for Pharma", "Smooth Loading Face"] },
          { id: "reusable-collar", name: "Reusable Collar Pallet", subTitle: "Modular Box System", img: "/images/products/Reusable-Collar-Pallet.jpg", specs: ["Convert Pallet to Box", "Collapsible Design", "Scalable Height", "Sturdy Side Hinges", "Space Saving Return"] },
          { id: "molded-pallets", name: "Molded Pallets", subTitle: "Pressed Wood Fiber", img: "/images/products/engineered-molded-wood-pallets.jpg", specs: ["Nestable Design", "ISPM-15 Exempt", "Consistent Dimensions", "No Nails or Screws", "Recycled Wood Fiber"] },
          { id: "collapsible-reusable", name: "Collapsible Reusable Pallets", subTitle: "Eco-Friendly Loop", img: "/images/products/Collapsible-Reusable-Pallets.jpg", specs: ["Foldable Structure", "Long Lifecycle", "Pine / Metal Mix", "Zero Tool Assembly", "Optimized Logistics"] },
        ]
      }
    ]
  },
  {
    id: "metal-pallets",
    title: "Metal Pallets",
    img: "/images/products/user_metal_pallets.jpg",
    iconName: "Shield",
    desc: "Heavy-duty steel and aluminum pallets for fire-safe, high-durability environments.",
    subCategories: [
      {
        title: "Standard Types",
        products: [
          { id: "galvanized-pallet", name: "Galvanized Metal Pallet", subTitle: "Rust-Proof Logistics", img: "/images/products/GALVANIZ-METAL-PALET-80X120-CM.webp", specs: ["Hot-Dip Galvanized", "Extreme Longevity", "Fire Resistant", "Zero Splintering", "No Bacteria Growth"] },
          { id: "corrosion-resistant-metal", name: "Corrosion Resistant Metal Pallet", subTitle: "Pharma & Chemical Grade", img: "/images/products/Corrosion-Resistant-Metal-Pallet.avif", specs: ["Special Coating", "Washable Design", "High Weight Capacity", "Smooth Welds", "Longer Asset Life"] },
          { id: "ms-pallet", name: "MS Pallet", subTitle: "Mild Steel Industrial", img: "/images/products/MS-Pallet.jpg", specs: ["Heavy Gauge Steel", "Powder Coated", "Custom Color Coding", "High Impact Strength", "Structural Grade"] },
          { id: "heavy-duty-metal", name: "Heavy Duty Metal Pallet", subTitle: "Multi-Ton Capacity", img: "/images/products/industrial-metal-pallets-manufacturer.png", specs: ["Reinforced Rails", "5,000kg+ Support", "Custom Engineering", "Crane Lifting Points", "Industrial Finish"] },
          { id: "aluminum-pallet", name: "Aluminum Pallet", subTitle: "Ultra-Lightweight Precision", img: "/images/products/Aluminium_flat_pallet_pdplarge-mrd--650915_AFS_00_00_00_13489266.jpg", specs: ["6061-T6 Grade Alloy", "Weight: 12kg Standard", "USDA/FDA Compliant", "Recyclable Scrappage", "Anti-Static Property"] },
          { id: "rackable-metal-pallet", name: "Rackable Metal Pallet", subTitle: "High-Bay Storage", img: "/images/products/Rackable-Metal-Pallet.webp", specs: ["Center Reinforcement", "Deflection Optimized", "Edge Retainers", "Compatible with ASRS", "Stacking Safety Lock"] },
        ]
      }
    ]
  },
  {
    id: "paper-pallets",
    title: "Paper Pallets",
    img: "/images/products/user_paper_pallets.jpg",
    iconName: "FileText",
    desc: "Lightweight, eco-friendly, and 100% recyclable paper pallets for air-freight and dry cargo.",
    subCategories: [
      {
        title: "Paper Options",
        products: [
          { id: "honeycomb-paper-pallet", name: "Honeycomb Paper Pallet", subTitle: "Structural Lightweight", img: "/images/products/Honeycomb-Paper-Pallet.avif", specs: ["High Compressive Strength", "ISPM-15 Exempt", "100% Recyclable", "Shock Absorbing", "Air Freight Friendly"] },
          { id: "two-way-paper-pallet", name: "Two Way Paper Pallet", subTitle: "Economical Logistics", img: "/images/products/hexacell-paper-pallets.png", specs: ["Kraft Paper Core", "Standard Sizes", "Export Friendly", "Low Carbon Footprint", "Dry Storage Only"] },
          { id: "disposable-paper-pallet", name: "Disposable Paper Pallet", subTitle: "One-Way Transit", img: "/images/products/paper-pallet-disposable-and-honey-comb-paper-pallets-359811324-tfv79.avif", specs: ["Single Use Optimized", "Ultra Low Weight", "Cost Effective", "Bio-Degradable", "Easy Disposal"] },
        ]
      }
    ]
  },
  {
    id: "plastic-pallets",
    title: "Plastic Pallets",
    img: "/images/products/user_plastic_pallets.webp",
    iconName: "Activity",
    desc: "Hygienic and durable HDPE/PP pallets for pharmaceuticals, food, and long-term warehousing.",
    subCategories: [
      {
        title: "Molded Plastic",
        products: [
          { id: "export-plastic-pallet", name: "Export Plastic Pallet", subTitle: "Zero Pathogen Risk", img: "/images/products/Plastic-Pallets-for-Export.png", specs: ["Virgin/Recycled HDPE", "ISPM-15 Exempt", "Washable surface", "Nestable for Storage", "Impervious to Water"] },
          { id: "injection-molded-pallet", name: "Injection Molded Pallet", subTitle: "Precision Integrity", img: "/images/products/Injection-Molded-Pallet.webp", specs: ["Consistent Weight", "High Strength", "Ergonomic Handling", "No Splinters", "Pharma Certified"] },
          { id: "roto-molded-pallet", name: "Roto Molded Pallet", subTitle: "Extra Heavy Duty", img: "/images/products/Roto-Molded-Pallet-recyclable-nestable-pallets-500x500.webp", specs: ["Seamless Construction", "Impact Resistant", "Custom Inserts", "Food Grade Design", "Long Asset Life"] },
          { id: "automobile-industry-pallet", name: "Automobile Industry Pallet", subTitle: "Parts Specific Design", img: "/images/products/Automobile-Industry-Pallet.jpeg", specs: ["Reinforced Deck", "High Static Load", "Standardized sizes", "Easy Cleaning", "Chemical Resistant"] },
          { id: "warehouse-plastic-pallet", name: "Warehouse Plastic Pallet", subTitle: "Internal Logistics", img: "/images/products/Warehouse-Plastic-Pallet.jpeg", specs: ["Rackable Design", "Sturdy Beams", "Anti-Slip Deck", "Long Lifecycle", "Standard Blue/Black"] },
          { id: "hd-plastic-pallet", name: "Heavy Duty Plastic Pallet", subTitle: "Dynamic Power", img: "/images/products/Heavy-Duty-Plastic-Palletsolid-plastic-pallets31493430861.webp", specs: ["Steel Reinforcement", "Max Load Design", "Impact Buffers", "Extreme Durability", "Industrial Grade"] },
        ]
      }
    ]
  },
  {
    id: "molded-pallets",
    title: "Molded Pallets",
    img: "/images/products/user_molded_pallets.jpg",
    iconName: "Aperture",
    desc: "Composite press-wood pallets for high-volume, eco-neutral logistics.",
    subCategories: [
      {
        title: "Pressed Wood",
        products: [
          { id: "press-wood-pallet", name: "Press Wood Pallet", subTitle: "Nestable Engineered", img: "/images/products/press-wood-pallets.jpg", specs: ["Heat Molded Fiber", "Space Saving Nesting", "ISPM-15 Exempt", "Rounded Corners", "100% Bio-Material"] },
          { id: "hydraulic-molded-pallet", name: "Hydraulic Molded Pallet", subTitle: "High Pressure Core", img: "/images/products/user_molded_pallets.jpg", specs: ["Precision Weight", "Dynamic Stability", "Low Cost Export", "Stacking Friendly", "Eco-Certified"] },
        ]
      }
    ]
  },
  {
    id: "wooden-skids",
    title: "Wooden Skids",
    img: "/images/products/user_wooden_skid.png",
    iconName: "Truck",
    desc: "Heavy-load skids designed for ODC (Over Dimensional Cargo) and heavy equipment.",
    subCategories: [
      {
        title: "Transport Skids",
        products: [
          { id: "odc-heavy-skid", name: "ODC Heavy Load Skid", subTitle: "Multi-Ton Base", img: "/images/products/user_wooden_skid.png", specs: ["Engineered Pine/Hardwood", "Custom Beam Thickness", "Bolted Construction", "Load Distributing Rails", "Crane-Ready Design"] },
          { id: "rain-protection-skid", name: "Rain/Dust Protection Skid", subTitle: "Covered Base System", img: "/images/products/user_wooden_skid.png", specs: ["Integrated Casing", "Waterproof Sealants", "VCI Compatible", "Durable Bottom Rail", "Outdoor Safe"] },
          { id: "heavy-equipment-skid", name: "Heavy Equipment Transport Skid", subTitle: "Machinery Grade", img: "/images/products/user_wooden_skid.png", specs: ["Anti-Skid Surface", "Steel Bracket Supports", "Custom Dimensioning", "Global Export Grade", "ISPM-15 HT"] },
        ]
      }
    ]
  },
  {
    id: "wooden-boxes",
    title: "Wooden Boxes",
    img: "/images/products/user_wooden_boxes.png",
    iconName: "Archive",
    desc: "Heavy-duty wooden casing for secure domestic and global machinery transit.",
    subCategories: [
      {
        title: "Crate Options",
        products: [
          { id: "wooden-crates", name: "Wooden Crates", subTitle: "Open-Slat Protection", img: "/images/products/user_wooden_crates.avif", specs: ["ISPM-15 Certified", "Cost-Effective Protection", "Visible Cargo", "Standard & Custom Sizes", "High Ventilation"] },
        ]
      },
      {
        title: "Casing Options",
        products: [
          { id: "heavy-equipment-boxes", name: "Heavy Equipment Boxes", subTitle: "Reinforced Enclosure", img: "/images/products/user_wooden_boxes.png", specs: ["Thick Wood Sheathing", "Internal Framing", "Bolted Latches", "Shock Dampening", "Custom CNC Cut"] },
          { id: "storage-boxes", name: "Storage Boxes", subTitle: "Long Term Crate", img: "/images/products/user_wooden_boxes.png", specs: ["Hinged Lids", "Stackable Corners", "Durable Handles", "Pest Protected", "Pine Construction"] },
        ]
      }
    ]
  },
  {
    id: "plywood-boxes",
    title: "Plywood Boxes",
    img: "/images/products/user_plywood_packing.webp",
    iconName: "BoxSelect",
    desc: "Elite, nail-less, and collapsible plywood systems for precision and export efficiency.",
    subCategories: [
      {
        title: "Export Packaging",
        products: [
          { id: "standard-export-boxes", name: "Standard Export Boxes", subTitle: "Phytosanitary Compliant", img: "/images/products/Export-Container.jpg", specs: ["High Strength-to-Weight", "ISPM-15 Exempt Bulk", "Smooth Surface", "Nail-Free Design", "Flat-Pack Delivery"] },
          { id: "vacuum-packing-boxes", name: "Vacuum Packing Boxes", subTitle: "Hermetic Casing", img: "/images/products/plywood-boxes-for-vacuum-packing-359814770-4d5za.avif", specs: ["Sealed Internal Base", "Aluminum Foil Lined", "Moisture Proof", "Custom Internal Blocking", "VCI Integration"] },
          { id: "epe-foam-boxes", name: "EPE Foam Boxes", subTitle: "Cushioned Internal", img: "/images/products/EPE-Foam-Boxes.jpeg", specs: ["Shock Absorbent Lining", "Precision Custom Cut", "Fragile Equipment Grade", "Anti-Static Options", "Multi-Layer Support"] },
        ]
      },
      {
        title: "Special & Functional",
        products: [
          { id: "waterproof-boxes", name: "Waterproof Boxes", subTitle: "Marine Grade Plywood", img: "/images/products/Waterproof-Wooden-Boxes .webp", specs: ["WBP Glue Bonding", "Edge Sealing", "Sea-Freight Ready", "No Leakage Points", "High Humidity Safe"] },
          { id: "ispm15-certified", name: "ISPM-15 Certified Boxes", subTitle: "Timber/Plywood Hybrid", img: "/images/products/ispm-15-certified-pinewood-boxes-for-export-cargo-shipping.png", specs: ["Official IPPC Stamp", "Heat Treated Frame", "Plywood Sheathing", "Border-Ready Status", "Compliance Guarantee"] },
          { id: "nail-less-boxes", name: "Nail-less Boxes", subTitle: "Steel Profile System", img: "/images/products/Nail-less-Boxes.webp", specs: ["Galvanized Steel Edges", "Rapid Tool-Free Assembly", "Space Saving Fold", "Premium Industrial Look", "Reusable Logistics"] },
        ]
      }
    ]
  },
  {
    id: "packaging-materials",
    title: "Packaging Materials",
    img: "/images/products/user_packing_materials.png",
    iconName: "Layers",
    desc: "Essential protective consumables for load stabilization and cargo safety.",
    subCategories: [
      {
        title: "Basic Materials",
        products: [
          { id: "stretch-film", name: "Stretch Film (LLDPE)", subTitle: "Cast & Blown Film", img: "/images/products/user_stretch_film.jpg", specs: ["High Cling Force", "Max Puncture Resistance", "Up to 300% Stretch", "Clear/Black Options", "Manual & Machine Grade"] },
          { id: "silica-gel", name: "Silica Gel", subTitle: "Desiccant Protection", img: "/images/products/Silica-Gel.avif", specs: ["High Adsorption Rate", "Tyvek Packaging", "Indicator Beads", "DMF Free", "Various Sachet Sizes"] },
          { id: "vci-paper", name: "Anti-Corrosion (VCI) Paper", subTitle: "Metal Surface Protection", img: "/images/products/VCI-paper-example.jpg", specs: ["Active VCI Atoms", "Eco-Friendly Kraft", "No Residue Leave", "Long-Term Warranty", "Multimetal Protection"] },
          { id: "vci-poly-bag", name: "VCI Poly Bags", subTitle: "Ferrous Metal Shield", img: "/images/products/vci-poly-bag-500x500.webp", specs: ["3D Gusseted Options", "Moisture Barrier Poly", "Blue/Yellow Tint", "Active Vapor release", "Automotive Approved"] },
        ]
      },
      {
        title: "Protection & Monitoring",
        products: [
          { id: "dehumidifier", name: "Industrial Dehumidifier", subTitle: "Clay/Silica Packs", img: "/images/products/Industrial-Dehumidifier.jpeg", specs: ["Container-Large Capacity", "Moisture Absorption", "Dew Point Reduction", "Cargo Safe Hooks", "Long Shipments Grade"] },
          { id: "angle-boards", name: "Edge/Angle Boards", subTitle: "Paper/Plastic Guard", img: "/images/products/Edge-Angle Boards.jpg", specs: ["Compressed Paper Core", "High Vertical Strength", "Strapping Protection", "Custom Lengths", "Moisture Resistant"] },
          { id: "humidity-indicator", name: "Humidity Indicator", subTitle: "Condition Monitoring", img: "/images/products/Humidity-Indicator.avif", specs: ["Color Changing Circles", "Cobalt-Free Options", "Precise Level Markers", "Adhesive Backing", "Sealed Environment Check"] },
          { id: "rust-preventive-spray", name: "Rust Preventive Spray", subTitle: "Aerosol Protection", img: "/images/products/rust-preventive-ai.png", specs: ["Deep Penetration", "Drying Barrier Film", "Salt Spray Tested", "Easy Application", "Tooling Grade Protection"] },
        ]
      },
      {
        title: "Thermal Control",
        products: [
          { id: "thermal-pallet-cover", name: "Thermal Pallet Covers", subTitle: "Insulated Barrier", img: "/images/products/user_thermal_cover.jpg", specs: ["Reflective Aluminum Layer", "Temperature Maintenance", "UV Resistant", "Custom Dimensions", "Reusable & Durable"] },
          { id: "container-thermal-liner", name: "Container Thermal Liners", subTitle: "Full Container Shield", img: "/images/products/Container-Thermal-Liners.jpg", specs: ["Six-Sided Protection", "Easy Installation", "Radiant Heat Barrier", "Moisture Resistance", "FMCG/Pharma Grade"] },
        ]
      }
    ]
  },
  {
    id: "packaging-laminates",
    title: "Packaging Laminates",
    img: "/images/products/user_packaging_laminates.jpg",
    iconName: "Component",
    desc: "Multi-layer barrier foils and sheets for extreme environmental protection.",
    subCategories: [
      {
        title: "Barrier Films",
        products: [
          { id: "vci-film", name: "VCI Film", subTitle: "Volatile Corrosion Protection", img: "/images/products/VCI-Film.jpg", specs: ["Integrated VCI Resin", "Transparent Blue/Yellow", "Hermetic Sealing Capability", "No Oiling Required", "Automotive Grade"] },
          { id: "hessian-cloth", name: "Hessian Cloth", subTitle: "Jute Packaging", img: "/images/products/hessian-cloth-500x500.webp", specs: ["Natural Fiber", "Breathable Material", "Sandbags & Sacks", "Eco-Friendly", "Industrial Grade"] },
          { id: "aluminum-foil", name: "Aluminum Foil (3/4 Layer)", subTitle: "Extreme Barrier", img: "/images/products/Aluminum-Foil-(3:4 Layer).webp", specs: ["PET/ALU/PE Triplex", "Zero WVTR rate", "Heat Sealable", "Military Grade (MIL-SPEC)", "Export Sea-Freight Type"] },
          { id: "kraft-laminate", name: "Kraft Paper Laminate", subTitle: "Reinforced Wrapping", img: "/images/products/Kraft-Paper-Laminate.webp", specs: ["Poly-Coated Interior", "High Tear Resistance", "Moisture Barrier", "Neutral PH Balance", "Industrial Bundle Wrap"] },
          { id: "pet-barrier-film", name: "PET Barrier Film", subTitle: "High Clarity Shield", img: "/images/products/PET-Barrier-Film.avif", specs: ["Biaxially Oriented", "Gas Barrier Property", "Aroma Protection", "Static Dissipative", "Pharma Packaging Grade"] },
        ]
      }
    ]
  },
  {
    id: "plywood-wood-material",
    title: "Plywood / Wood Material",
    img: "/images/products/user_plywood_packing.webp",
    iconName: "TreePine",
    desc: "Raw timber and board material for industrial manufacturing and construction.",
    subCategories: [
      {
        title: "Industrial Boards",
        products: [
          { id: "marine-plywood", name: "Marine Plywood", subTitle: "WBP Grade Board", img: "/images/products/marine-grade-plywood-1000x1000.png", specs: ["Boiling Water Proof", "Face/Back Selection", "Termite Resistant", "Structural Rigidity", "Export Grade"] },
          { id: "osb-board", name: "OSB Board", subTitle: "Oriented Strand Board", img: "/images/products/OSB-Plywood-Board.webp", specs: ["High Flexural Strength", "Engineered Wood Flakes", "Low Cost Packaging", "Structural Bracing", "Standard Sizes"] },
          { id: "mdf-industrial", name: "Industrial MDF", subTitle: "Medium Density Fiberboard", img: "/images/products/Industrial-Grade-MDF-Edge-Bander-for-Perfect-Furniture-Edges.avif", specs: ["Homogeneous Density", "Prime Paint Surface", "Precision Machining", "Carb2 Compliant", "Pattern Making Grade"] },
        ]
      },
      {
        title: "Timber Types",
        products: [
          { id: "nz-pine", name: "New Zealand Pine", subTitle: "Softwood Export Grade", img: "/images/products/new-zealand-pine-wood-timber-075.jpg", specs: ["Radiata Pine", "Fast Growth Timber", "Excellent Workability", "Kiln Dried (KD)", "Standard Pallet Wood"] },
          { id: "jungle-wood", name: "Jungle Wood", subTitle: "Hardwood Density", img: "/images/products/2-6-inches-teak-jungle-wood-plank-anti-slip-waterproof--353.jpg", specs: ["Extreme Hardness", "Local Native Wood", "High Static Load", "Heavy Skid Base", "Naturally Durable"] },
        ]
      }
    ]
  },
  {
    id: "packaging-hardware",
    title: "Packaging Hardware",
    img: "/images/products/user_packaging_hardware.png",
    iconName: "Nut",
    desc: "Metal components and fasteners for industrial box and pallet construction.",
    subCategories: [
      {
        title: "Fasteners & Brackets",
        products: [
          { id: "eye-bolts", name: "Eye Bolts", subTitle: "Lifting Point", img: "/images/products/Eye-Bolt.jpg", specs: ["Forged Steel", "Metric/Imperial Threads", "Zinc Plated", "Safety Tested", "Heavy Crate Lifting"] },
          { id: "l-brackets", name: "L Brackets", subTitle: "Corner Reinforcement", img: "/images/products/4-Pack-Heavy-Duty-Shelf-Brackets-L-Shaped-Angle-Shelf-Brackets-5-x-3-Inch_d1439388-d095-4916-bfc8-4e97afa970b6.8536ff7fc41287b391ed1e63f687b29d.avif", specs: ["Thick Gauge Steel", "Pre-Drilled Holes", "Heavy Box Support", "Anti-Rust Coating", "Structural Integrity"] },
          { id: "coil-nails", name: "Coil Nails", subTitle: "Pneumatic Fastening", img: "/images/products/coil-nail-smooth.jpg", specs: ["Ring Shank Pattern", "Wire Collated", "Rust Resistant Coating", "High Speed Driving", "Pallet Production Standard"] },
          { id: "steel-strapping", name: "Steel Strapping", subTitle: "Heavy Tension Banding", img: "/images/products/Steel-Strapping.jpg", specs: ["Blued & Waxed Finish", "High Tensile Strength", "Sharp Edge Protection", "Sealless Join Ready", "ODC Cargo Securing"] },
          { id: "corner-protectors", name: "Corner Protectors", subTitle: "Plastic/Steel Guard", img: "/images/products/Corner-Protectors.png", specs: ["Impact Resistant HDPE", "Radius Edge Design", "Strap Alignment Rails", "Prevents Edge Crushing", "Reusable Durability"] },
        ]
      }
    ]
  },
  {
    id: "lashing-materials",
    title: "Lashing Materials",
    img: "/images/products/user_lashing_materials.jpg",
    iconName: "Link",
    desc: "High-tension securing systems for container and ODC cargo stability.",
    subCategories: [
      {
        title: "Securing Systems",
        products: [
          { id: "ratchet-belt", name: "Ratchet Belt", subTitle: "Polyester Webbing", img: "/images/products/ratchet-lashing-belts-for-goods-carrier.jpeg", specs: ["High Break Strength", "Weather Resistant", "Long Lifespan", "Custom Length Labels", "Safety Certified"] },
          { id: "d-shackles", name: "D Shackles", subTitle: "Load Connection", img: "/images/products/ms-d-shackle.jpg", specs: ["Alloy Steel Forging", "Screw Pin Type", "Galvanized Finish", "High SWL Marks", "Marine Environment Safe"] },
          { id: "wire-rope", name: "Steel Wire Rope", subTitle: "Heavy-Duty Lashing", img: "/images/products/stainless-steel-wire-rope.jpg", specs: ["Galvanized Core", "IWRC Construction", "High Minimum Breaking Load", "Anti-Twist Design", "Marine Grade"] },
          { id: "chain-lashing", name: "Grade 80 Chain Lashing", subTitle: "Extreme Load Securing", img: "/images/products/Grade-80-Chain-Lashing.webp", specs: ["Alloy Steel Chain", "Certified Tensioners", "Toughness in Cold", "High Safety Factor", "Machinery Securing"] },
        ]
      }
    ]
  },
  {
    id: "antirust-treatment",
    title: "Anti-Rust Treatment",
    img: "/images/products/user_anti_rust.png",
    iconName: "ShieldCheck",
    desc: "Chemical and grease-based rust prevention for precision metal parts.",
    subCategories: [
      {
        title: "Coatings & Grease",
        products: [
          { id: "ashfasil-gold", name: "Ashfasil Gold Coating", subTitle: "Elite Chemical Barrier", img: "/images/products/Ashfasil-Gold-Coating.jpeg", specs: ["Deep Penetration", "Gold Finish Indicator", "Multi-Year Protection", "Easily Removable", "Automotive Approved"] },
          { id: "rust-prevention-gold", name: "Rust Prevention (Ashfosil GOLD Anti Rust Treatment)", subTitle: "Premium Corrosion Shield", img: "/images/products/Rust Prevention (Ashfosil-GOLD-Anti-Rust-Treatment).png", specs: ["Industrial Grade Anti-Rust", "Elite Chemical Barrier", "Long-Term Metal Protection", "Easy Application & Removal", "Automotive & Marine Approved"] },
          { id: "europack-rust-prevention", name: "Europack Rust Prevention", subTitle: "Using Transparent / Golden Coating", img: "/images/products/Rust-Prevention-Using-Transprent-Golden-Coating.png", specs: ["Premium Solvent-Based Coating", "Transparent & Golden Options", "Moisture Displacement Technology", "Durable Protective Film", "Precision Clean Industrial Finish"] },
        ]
      }
    ]
  },
  {
    id: "heavy-engineering-packaging",
    title: "Heavy Engineering Packaging",
    img: "/images/products/user_heavy_engineering_packing.jpg",
    iconName: "Cog",
    desc: "Turnkey packaging solutions for capital equipment and massive machinery.",
    subCategories: [
      {
        title: "Engineering Solutions",
        products: [
          { id: "hood-packing", name: "Hood Packing", subTitle: "Complete Metal Enclosure", img: "/images/products/Hood-Packing-on-Steel-Base.jpg", specs: ["Overhead Loading", "Modular Panels", "Steel/Wood Frame", "Extreme Protection", "Bespoke Engineering"] },
          { id: "steel-fixture-packing", name: "Packing On Steel Fixture", subTitle: "Precision Structural Support", img: "/images/products/Packing-On-Steel-Fixture.png", specs: ["Custom Fabricated Steel Base", "Precision Load Alignment", "Anti-Vibration Mounting", "Heavy-Duty Structural Members", "Bespoke Fixture Engineering"] },
          { id: "heavy-engineering-packing", name: "Heavy Engineering Packing", subTitle: "Custom Structural Engineering", img: "/images/products/Heavy-Engineering-Packing.jpg", specs: ["Extreme Load Capacity", "Structural Steel Bracing", "Custom Engineered Skids", "Multi-Point Anchoring", "Site Deployment Ready"] },
          { id: "complete-palletization", name: "Complete Palletization", subTitle: "End-to-End Logistics Solution", img: "/images/products/Complete-Palletization.webp", specs: ["Automated Strapping Integration", "High-Volume Throughput", "Precision Pallet Alignment", "Secure Load Stabilization", "Custom Logistics Workflow"] },
          { id: "ms-crate-packing", name: "MS Crate Packing", subTitle: "Steel Frame Security", img: "/images/products/user_ms_frame_packing.jpg", specs: ["Mild Steel Structural Frame", "Custom Welded Grid", "Heavy Load Anchoring", "Multi-Point Lifting", "Long-Distance Transit"] },
        ]
      }
    ]
  },
  {
    id: "vacuum-packaging",
    title: "Vacuum Packaging",
    img: "/images/products/user_vacuum_packing.png",
    iconName: "Wind",
    desc: "Hermetic moisture-proof packaging for humidity-sensitive electronics and precision parts.",
    subCategories: [
      {
        title: "Vacuum Systems",
        products: [
          { id: "multilayer-laminated-vci", name: "Multilayer Laminated with VCI Packaging + Nylon", subTitle: "Vacuum Packing", img: "/images/products/vacuum-4-layer-film.png", specs: ["100% Moisture Removal", "Active VCI barrier", "Heat Seal Integrity", "Transparency for Check", "Zero Oxygen ingress"] },
          { id: "four-layer-film-vacuum", name: "4 Layer Film", subTitle: "Vacuum Packing and Sealing", img: "/images/products/vacuum-4-layer-film.png", specs: ["Nylon Outer Layer", "Aluminum Core", "Max Sealing strength", "Extreme Barrier WVTR", "Medical/Pharma Grade"] },
          { id: "finest-quality-4n-vacuum", name: "Finest Quality 4N Norms Vacuum Packing", subTitle: "Military & Industrial Spec", img: "/images/products/vacuum-rust-prevention.png", specs: ["4-Layer Barrier Foil", "Nitrogen Purging Option", "Zero Leakage Seal", "Long-Term Storage Grade", "Sea-Freight Compliant"] },
          { id: "odd-shape-vacuum", name: "Vacuum packing for Odd Shape & Size Components with Sharp Edges", subTitle: "Vacuum Packing", img: "/images/products/vacuum-odd-shape.png", specs: ["Puncture Resistant Film", "Custom Molded Contours", "Heavy-Duty Sealant", "Edge Protection Integrated", "Dynamic Shape Adaptability"] },
          { id: "rust-prevention-vacuum", name: "Vacuum Packing for Prevention of Rusting Moisture & Product Deterioration", subTitle: "Vacuum Packing", img: "/images/products/vacuum-rust-prevention.png", specs: ["Zero Moisture Environment", "Molecular Corrosion Inhibitors", "Hermetic Seal Technology", "UV Protection Barrier", "Multi-Year Storage Grade"] },
        ]
      }
    ]
  },
  {
    id: "stretch-wrapping",
    title: "Stretch Wrapping",
    img: "/images/products/user_stretch_film.jpg",
    iconName: "FastForward",
    desc: "Automated and manual wrapping solutions for load unitization and dust protection.",
    subCategories: [
      {
        title: "Wrapping Options",
        products: [
          { id: "pallet-wrapping", name: "Pallet Wrapping", subTitle: "Unitization Shield", img: "/images/products/user_stretch_film.jpg", specs: ["High Clarity", "Pre-Stretch Ready", "Consistent Tension", "Dust Protection", "Eco-Thin Gauge"] },
          { id: "rain-protection-wrap", name: "Rain & Dust Protection Wrapping", subTitle: "Top-Sheet Integration", img: "/images/products/user_stretch_film.jpg", specs: ["UV Stabilized Film", "Watertight layering", "Industrial Strength", "Outdoor Logistics", "Seamless Covering"] },
          { id: "machine-grade-film", name: "Machine Grade Stretch", subTitle: "High-Volume Wrap", img: "/images/products/user_stretch_film.jpg", specs: ["Cast Co-extruded", "Ultra-High Puncture Resistance", "Consistent Roll Length", "Quiet Unwind", "Max Unitization Force"] },
        ]
      }
    ]
  },
  {
    id: "corrugated-cartons",
    title: "Corrugated & Cartons",
    img: "/images/products/corrugatedBoxes.png",
    iconName: "LayoutTemplate",
    desc: "High-bursting strength paper cartons for e-commerce, retail, and bulk supply.",
    subCategories: [
      {
        title: "Carton Types",
        products: [
          { id: "printed-corrugated", name: "Printed Corrugated Boxes", subTitle: "High-Impact Branding", img: "/images/products/user_printed_corrugated.jpg", specs: ["3/5/7/9 Ply Options", "Flexo/Litho Printing", "Custom Sizing", "Eco-Friendly Recycled", "Stacking Strength"] },
          { id: "mono-cartons", name: "Mono Cartons", subTitle: "Retail Packaging", img: "/images/products/user_mono_carton.webp", specs: ["High-Gloss Finish", "Die-Cut Windows", "Lightweight Board", "Intricate Printing", "FMCG Grade"] },
          { id: "9ply-heavy-duty", name: "9-Ply Heavy Duty Box", subTitle: "Export Grade Carton", img: "/images/products/user_jumbo_boxes.webp", specs: ["Extreme Crush Resistance", "Wood Box Alternative", "Double Fluting Design", "Large Load Support", "Recyclable Export Choice"] },
          { id: "corrugated-partitions", name: "Corrugated Partitions", subTitle: "Internal Protection", img: "/images/products/corrugated-partitions.png", specs: ["Custom Grid Layout", "Anti-Collision Barrier", "Interlocking Design", "Lightweight Separation", "Glassware/Auto Grade"] },
          { id: "jumbo-boxes", name: "Jumbo Boxes", subTitle: "Bulk Cargo Enclosure", img: "/images/products/jumbo-boxes.png", specs: ["Pallet-Size Dimensions", "Triple Wall Strength", "Heavy Duty Strapping", "High Volume Capacity", "Integrated Pallet Base"] },
        ]
      }
    ]
  },
  {
    id: "dunnage-bag",
    title: "Dunnage Bag",
    img: "/images/products/user_dunnage_bag.webp",
    iconName: "Airplay",
    desc: "Inflatable void-fill systems to prevent cargo movement in containers and ships.",
    subCategories: [
      {
        title: "Air Systems",
        products: [
          { id: "air-dunnage-bags", name: "Air Dunnage Bags", subTitle: "Load Stabilizer", img: "/images/products/dunnage-air-bags-kraft.png", specs: ["Kraft Paper Outer", "Polywoven Options", "Fast-Inflate Valve", "AAR Level 1-5", "Multi-Ton Void Fill"] },
          { id: "polywoven-dunnage", name: "Polywoven Dunnage Bag", subTitle: "Moisture-Proof Support", img: "/images/products/dunnage-polywoven.png", specs: ["Extreme Burst Strength", "Reusable Design", "Weather Resistant", "Max Surface Friction", "Intermodal Cargo Grade"] },
          { id: "reusable-air-bag", name: "Reusable Air Bag", subTitle: "Internal Logistics Loop", img: "/images/products/dunnage-reusable.png", specs: ["Washable surface", "Integrated Gauge", "Easy Deflation", "Long Lifecycle", "Distribution Center Ready"] },
        ]
      }
    ]
  },
  {
    id: "special-cases",
    title: "Tool Cases / Special Cases",
    img: "/images/products/user_tool_cases.png",
    iconName: "Briefcase",
    desc: "Rugged and custom-lined cases for high-value equipment and field services.",
    subCategories: [
      {
        title: "Equipment Protection",
        products: [
          { id: "tool-case", name: "Tool Case", subTitle: "Impact Resistant", img: "/images/products/tool-case-impact.png", specs: ["Hard-Shell Plastic", "Foam Cutouts", "Lockable Latches", "Waterproof Seal", "Field Mobility"] },
          { id: "energy-case", name: "Energy Case", subTitle: "Technical Protection", img: "/images/products/energy-case-protection.png", specs: ["Integrated Ports", "Reinforced Frame", "Custom Padding", "Electronic Shield", "Industrial Grade"] },
          { id: "flight-case", name: "Industrial Flight Case", subTitle: "Global Transit Grade", img: "/images/products/industrial-flight-case.png", specs: ["Birch Plywood + ABS", "Aluminum Extrusions", "Ball Corners", "Recessed Latches", "Heavy Casting Wheels"] },
          { id: "instrument-case", name: "Waterproof Instrument Case", subTitle: "Scientific Grade", img: "/images/products/tool-case-impact.png", specs: ["IP67 Rated Seal", "Pressure Equalizer Valve", "Pick-N-Pluck Foam", "High Impact Resin", "Extreme Temperature Range"] },
        ]
      }
    ]
  },
  {
    id: "wood-fibre-packaging",
    title: "Wood Fibre Packaging",
    img: "/images/products/user_wooden_fibre.png",
    iconName: "ScanLine",
    desc: "Eco-neutral fiber-based protection for tubes, bars, and industrial bundles.",
    subCategories: [
      {
        title: "Fiber Protection",
        products: [
          { id: "nolco-flex", name: "Nolco-Flex", subTitle: "Flexible Profile Protection", img: "/images/products/Nolco-Flex.jpeg", specs: ["Wood-Fiber Core", "Impact Absorption", "Flexible Wrap", "Reusable Loop", "Corner Shielding"] },
          { id: "tube-packing", name: "Tube Packing", subTitle: "Bundle End Protection", img: "/images/products/Tube-Packing.jpg", specs: ["Molded Caps", "Impact Buffers", "Moisture Resistant", "Standard Sizing", "Reinforced End-Seals"] },
        ]
      }
    ]
  },
  {
    id: "services",
    title: "Services",
    img: "/images/products/user_heavy_engineering_packing.jpg",
    iconName: "Wrench",
    desc: "On-site palletization and packaging services for large industrial output.",
    subCategories: [
      {
        title: "Palletization Services",
        products: [
          { id: "thermal-palletization", name: "Thermal Palletization", subTitle: "Pharma Grade Service", img: "/images/products/Thermal-Palletization-cover.jpg", specs: ["Cold Chain Monitoring", "Insulated Pallets", "On-Site Setup", "Audit Ready", "Global Compliance"] },
          { id: "barrel-palletization", name: "Barrel / Drum Palletization", subTitle: "Bulk Liquid Safety", img: "/images/products/oil-drum-storage-pallets.jpeg", specs: ["CP3 Pallet Usage", "Lashing Securing", "Hazardous Material Grade", "Drum Loading Grid", "Transit Stability"] },
          { id: "onsite-lashing", name: "On-Site Container Lashing", subTitle: "Port/Factory Service", img: "/images/products/container-lashing.jpg", specs: ["Certified Riggers", "Bureau Veritas Standard", "Dunnage Integration", "Safety Protocol Audit", "Heavy Cargo Mastery"] },
          { id: "stuffing-service", name: "Container Stuffing", subTitle: "Expert Loading", img: "/images/products/container-stuffing-service.jpg", specs: ["Space Optimization", "Weight Balance Check", "Moisture Mitigation", "Blocking & Bracing", "Sea-Ready Certification"] },
        ]
      }
    ]
  },
  {
    id: "special-services",
    title: "Special Services",
    img: "/images/products/user_heavy_engineering_packing.jpg",
    iconName: "Star",
    desc: "Custom on-site wrapping and bundling for oversized industrial projects.",
    subCategories: [
      {
        title: "Special Operations",
        products: [
          { id: "shrink-wrapping-service", name: "Shrink Wrapping", subTitle: "Heavy-Duty Heat Shrink", img: "/images/products/user_shrink_packing.png", specs: ["UV Proof 12mil Film", "Hermetic Protection", "On-Site Deployment", "Oversized Load Grade", "Wind-Resistant Seal"] },
          { id: "pipe-bundling", name: "Pipe Bundling", subTitle: "Bundle Securing", img: "/images/products/user_pipe_bundling.png", specs: ["Nolco-Soft protection", "Steel Strapping", "Anti-Collision Spacers", "Marine Transit Safe", "Precision Tensioning"] },
          { id: "dg-packing", name: "Dangerous Goods Packing", subTitle: "IMDG Compliant", img: "/images/products/user_heavy_engineering_packing.jpg", specs: ["UN Certified Boxes", "Hazmat Labeling", "Special Segregation", "Global IATA Ready", "Chemical Safety Trained"] },
          { id: "export-packing", name: "Export Packing", subTitle: "Global Compliance", img: "/images/products/user_export_packing.jpg", specs: ["ISPM-15 Certified", "Phytosanitary Documentation", "Standardized Labelling", "Sea/Air Freight Ready", "Zero Port Rejection"] },
          { id: "seaworthy-packing", name: "Seaworthy Packing", subTitle: "Ocean Freight Shield", img: "/images/products/user_seaworthy_laminates.jpg", specs: ["Multi-Layer Barrier", "VCI Rust Protection", "Moisture Desiccants", "Heavy-Duty Securing", "Corrosion Resistant"] },
          { id: "turnkey-packaging", name: "Turnkey Packaging Solutions", subTitle: "End-to-End Management", img: "/images/products/user_heavy_engineering_packing.jpg", specs: ["Design & Engineering", "On-Site Deployment", "Logistics Coordination", "Cost Optimization", "Quality Assurance"] },
        ]
      }
    ]
  }
];

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronRight, ArrowRight, CheckCircle2, Shield, Zap, Globe,
  Package, Phone, MessageSquare, Star, Award, BookOpen, Wrench,
  Truck, Factory, HardHat, FlaskConical, HeartPulse, Warehouse,
  Check, X, ChevronDown, FileText, Box, Anchor, Ship, Cpu, Monitor
} from 'lucide-react';
import EnquiryModal from '../../../../components/public/EnquiryModal';

// =====================================================
// TYPES
// =====================================================
interface Product {
  _id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  category: string;
  features: string[];
  viewLink?: string;
  quoteLink?: string;
  active?: boolean;
}

// =====================================================
// RICH CONTENT LOOKUP
// =====================================================
interface ProductRichContent {
  subtitle: string;
  tagline: string;
  overview: string;
  specs: { key: string; value: string }[];
  benefits: { icon: any; title: string; desc: string }[];
  applications: { icon: any; title: string; desc: string }[];
  comparison: { feature: string; thisProduct: string; alternative: string; thisBetter: boolean }[];
  comparisonLabel: string;
  manufacturingSteps: { step: string; title: string; desc: string }[];
  relatedBlogs: { title: string; slug: string; img: string; cat: string }[];
  faq: { q: string; a: string }[];
  caseStudy?: { client: string; result: string; detail: string };
  images: string[];
  seoContent: string;
  procedure?: {
    intro: string;
    steps: { title: string; desc: string; items: string[] }[];
  };
  advantages?: string[];
}

const productContent: Record<string, ProductRichContent> = {
  'wooden-pallets': {
    subtitle: 'ISPM-15 Certified Heat-Treated Pine Wood Pallets for International Export',
    tagline: 'The Foundation of Every Successful Shipment',
    overview: `Europack wooden pallets are precision-engineered from kiln-dried, heat-treated pine wood to meet the most demanding international export standards. As a registered ISPM-15 facility, every pallet we produce carries the official IPPC mark, ensuring acceptance in 190+ countries without fumigation delays at customs.

Our pallets are used across heavy engineering, automotive, pharmaceutical, and FMCG sectors for safe unitisation of cargo ranging from 500 kg to 5,000 kg. Whether you need standard Euro pallets, 4-way entry block pallets, or completely custom-dimensioned solutions, Europack delivers with precision, speed, and compliance guaranteed.

With Pan India presence across multiple locations, we supply pallets directly to factory floors, warehouses, and port yards across the country.`,
    specs: [
      { key: 'Material', value: 'Heat-Treated Pine Wood / Hardwood' },
      { key: 'ISPM-15', value: 'Fully Certified & Stamped' },
      { key: 'Load Capacity', value: 'Up to 3,000 kg (Static)' },
      { key: 'Sizes', value: 'Custom & Euro Standard (800×1200mm)' },
      { key: 'Moisture Content', value: '< 18% (Kiln Dried)' },
      { key: 'Treatment', value: 'HT — Heat Treatment at 56°C for 30 min' },
      { key: 'Nail Pattern', value: 'ISO 8611 Compliant' },
      { key: 'Forklift Entry', value: '2-Way & 4-Way Available' },
      { key: 'Lead Time', value: '3–7 Working Days' },
      { key: 'MOQ', value: '50 Units (Standard Sizes)' },
    ],
    benefits: [
      { icon: Shield, title: 'ISPM-15 Compliant', desc: 'Every pallet stamped with official IPPC mark, accepted in 190+ countries without fumigation.' },
      { icon: Zap, title: 'High Load Capacity', desc: 'Engineered to handle static loads up to 3,000 kg and dynamic loads up to 1,500 kg.' },
      { icon: Globe, title: 'Export Ready', desc: 'Accepted by customs at US, EU, Australian, and Middle Eastern inspection points.' },
      { icon: Wrench, title: 'Custom Sizing', desc: 'We manufacture to your exact dimension requirements, from mini pallets to heavy ODC configurations.' },
    ],
    applications: [
      { icon: Factory, title: 'Heavy Machinery', desc: 'Supporting turbines, CNC machines, and multi-ton industrial equipment.' },
      { icon: Truck, title: 'Export Shipping', desc: 'ISPM-15 compliant pallets accepted at all major global ports.' },
      { icon: Warehouse, title: 'Warehouse Storage', desc: 'Rackable designs for high-bay ASRS and conventional storage.' },
      { icon: Package, title: 'Automotive', desc: 'CKD kit and precision component packaging for OEMs.' },
      { icon: HeartPulse, title: 'Pharma Industry', desc: 'Hygienic, splinter-free surfaces for sensitive pharmaceutical cargo.' },
      { icon: FlaskConical, title: 'Chemical Sector', desc: 'CP-series pallets engineered for bagged and drummed chemical goods.' },
    ],
    comparison: [
      { feature: 'Cost per Unit', thisProduct: 'Low (Wood)', alternative: 'High (Plastic)', thisBetter: true },
      { feature: 'Load Strength', thisProduct: 'Very High', alternative: 'Medium', thisBetter: true },
      { feature: 'ISPM-15 Required', thisProduct: 'Yes (Certified)', alternative: 'No (No Compliance Needed)', thisBetter: true },
      { feature: 'Reusability', thisProduct: 'Moderate (3–5 cycles)', alternative: 'High (Long Life)', thisBetter: false },
      { feature: 'Custom Sizing', thisProduct: 'Any Dimension', alternative: 'Limited Molds', thisBetter: true },
      { feature: 'Repair & Service', thisProduct: 'Easy — Replace Boards', alternative: 'Cannot Repair', thisBetter: true },
    ],
    comparisonLabel: 'Plastic Pallet',
    manufacturingSteps: [
      { step: '01', title: 'Wood Selection', desc: 'Sourcing certified pine logs, graded for density, grain uniformity, and moisture content below 18%.' },
      { step: '02', title: 'Precision Cutting', desc: 'CNC saw lines cut boards to exact dimension tolerances with zero warping allowance.' },
      { step: '03', title: 'Assembly & Nailing', desc: 'ISO 8611-compliant nail patterns assembled on jig tables for structural consistency.' },
      { step: '04', title: 'Heat Treatment', desc: 'Core temperature of 56°C for 30 continuous minutes in registered ISPM-15 kilns — IPPC stamped.' },
      { step: '05', title: 'Quality Check & Dispatch', desc: 'Load-test, dimensional audit, and documentation before delivery to your factory or port.' },
    ],
    relatedBlogs: [
      { title: 'ISPM-15 Complete Guide for Exporters', slug: 'ispm-15-complete-guide', img: '/images/banners/1.png', cat: 'Compliance' },
      { title: 'Corrugated vs Plywood vs Solid Wood', slug: 'choosing-right-export-box', img: '/images/banners/4.png', cat: 'Materials' },
    ],
    faq: [
      { q: 'What is ISPM-15 certification and why is it mandatory?', a: 'ISPM-15 (International Standards for Phytosanitary Measures No. 15) is a global regulation requiring wooden packaging used in international trade to be heat-treated or fumigated to prevent the spread of invasive insects. Without it, your shipment can be rejected at destination ports.' },
      { q: 'Do you stamp the IPPC mark on each pallet?', a: 'Yes. Every pallet we produce is heat-treated in our registered kiln facility and carries the official IPPC mark with our registered facility code, country code (IN), treatment type (HT), and producer number.' },
      { q: 'What is the maximum load capacity of your wooden pallets?', a: 'Our standard wooden pallets support static loads up to 3,000 kg and dynamic (forklift) loads up to 1,500 kg. For heavy ODC cargo, we engineer custom pallets capable of supporting 5,000 kg+ with reinforced block designs.' },
      { q: 'What is your minimum order quantity (MOQ)?', a: 'Our MOQ is 50 units for standard sizes (Euro 800×1200mm, 1000×1200mm). Custom sizes and thicknesses may require a higher MOQ — contact us for a project-specific quote.' },
      { q: 'Can you deliver to the port?', a: 'Absolutely. We deliver to all major Indian ports including JNPT (Mumbai), Mundra, Chennai, Vizag, and Kolkata, coordinating with your freight forwarder for seamless logistics.' },
      { q: 'What wood species do you use for pallets?', a: 'We primarily use kiln-dried pine wood for standard export pallets. For heavy-duty and ODC applications, we use dense hardwood species (teak, eucalyptus) for maximum structural integrity.' },
      { q: 'Can I get custom-sized pallets?', a: 'Yes, we manufacture custom pallets to any dimension you specify. Provide us with your cargo footprint, weight, and stacking requirements and we will engineer the optimal pallet design.' },
      { q: 'What is the moisture content of your timber?', a: 'All our timber is kiln-dried to below 18% moisture content before use, which significantly reduces warping, splitting, and biological contamination risk during long sea voyages.' },
      { q: 'What is the difference between 2-way and 4-way pallets?', a: 'A 2-way pallet has forklift entry openings on 2 opposite sides only. A 4-way pallet allows pallet truck or forklift entry from all 4 sides, making it far more flexible for warehouse operations and container loading.' },
      { q: 'Do you offer phytosanitary certificate support?', a: 'Yes. As a registered ISPM-15 treatment facility, we provide the necessary documentation to support phytosanitary certificate applications via your local APEDA or customs agent.' },
      { q: 'What is your typical lead time?', a: 'Standard sizes are typically ready in 3–5 working days. Custom-engineered pallets require 5–10 working days depending on dimensions and volume. Emergency orders can be accommodated — contact us.' },
    ],
    caseStudy: { client: 'Heavy Machinery Exporter, Pune', result: '100% customs clearance across 7 destination countries', detail: 'A major turbine manufacturer switched to Europack pallets and eliminated all phytosanitary rejections at Australian and US ports, saving ₹18L annually in re-export costs.' },
    images: ['/images/banners/1.png', '/images/banners/banner_main.png', '/images/banners/2.png'],
    seoContent: `Europack is India's leading wooden pallets manufacturer, supplying ISPM-15 certified export pallets to industries across Mumbai, Pune, Jamshedpur, Vadodara, and pan-India. Our heat-treated wooden pallets meet all international phytosanitary standards and are accepted by customs authorities in the US, EU, Australia, New Zealand, China, and the Middle East.

We specialise in industrial packaging pallets for heavy machinery, automotive OEMs, pharmaceutical exporters, and chemical manufacturers. As a registered IPPC treatment facility, we ensure every wooden pallet manufactured at our facility is stamped with the official IPPC mark. Our pallet manufacturing facility is ISO 9001:2015 certified and our processes adhere to the latest IS: 1276 and ISPM-15 international standards.

Whether you need Euro pallets, block pallets, CP-series chemical pallets, or fully custom wooden pallets for ODC (Out-of-Dimension Container) cargo, Europack has the engineering expertise and production capacity to deliver on time, every time. Contact our technical team for a free consultation and ballpark quote.`,
  },

  'corrugated-boxes': {
    subtitle: '3-ply to 9 -ply custom-printed corrugated boxes for any weight requirement.',
    tagline: 'Precision Engineered. Print Ready. Globally Shipped.',
    overview: `Europack corrugated boxes are manufactured to the highest burst-strength and compressive-strength specifications for industrial, FMCG, pharmaceutical, and e-commerce applications. Available in 3 ply, 5 ply, 7 ply and 9 ply triple-wall constructions, our corrugated packaging solutions are engineered to protect your product from factory floor to end customer.

With in-house die-cutting, scoring, and up to 4-colour flexographic printing, we deliver boxes that are both structurally superior and brand-ready. Every batch is tested for ECT (Edge Crush Test), BCT (Box Compression Test), and Cobb values before dispatch.`,
    specs: [
      { key: 'Ply Options', value: '3 ply, 5 ply, 7 ply, 9 ply' },
      { key: 'Max Weight', value: 'Up to 250 kg per box' },
      { key: 'Flute Type', value: 'B, C, E, BC Double Wall' },
      { key: 'Printing', value: 'Up to 4-colour flexo or offset' },
      { key: 'Moisture Resistance', value: 'Wax or Poly-coated options' },
      { key: 'Burst Strength', value: 'Up to 14 kg/cm²' },
      { key: 'Compressive Strength', value: 'BCT 500–5000 N' },
      { key: 'Custom Sizes', value: 'Any dimension to the mm' },
      { key: 'MOQ', value: '500 units (standard), lower for custom' },
      { key: 'Lead Time', value: '4–7 Working Days' },
    ],
    benefits: [
      { icon: Shield, title: 'Maximum Protection', desc: '9 ply triple-wall construction absorbs shock under stacking loads of 5+ tonnes.' },
      { icon: Package, title: 'Brand Ready', desc: 'Up to 4-colour custom printing with your branding, product info and regulatory barcodes.' },
      { icon: Globe, title: 'Climate Resistant', desc: 'Available with moisture-resistant coatings to withstand humidity and tropical climates.' },
      { icon: Zap, title: 'Fast Turnaround', desc: 'Rapid prototyping with same-week sample dispatch for approved designs.' },
    ],
    applications: [
      { icon: Package, title: 'FMCG Packaging', desc: 'Master cartons for consumer goods with print-ready branding.' },
      { icon: HeartPulse, title: 'Pharma', desc: 'Sterile outer packaging with tamper-evident designs.' },
      { icon: Truck, title: 'E-Commerce', desc: 'Lightweight yet strong boxes for last-mile courier shipments.' },
      { icon: Factory, title: 'Auto Components', desc: 'Custom die-cut inserts for engine and precision parts.' },
      { icon: Warehouse, title: 'Warehouse', desc: 'High-BCT boxes for multi-tier stacking in racking systems.' },
      { icon: FlaskConical, title: 'Chemical', desc: 'UN-certified corrugated boxes for dangerous goods.' },
    ],
    comparison: [
      { feature: 'Weight', thisProduct: 'Lightweight', alternative: 'Heavy', thisBetter: true },
      { feature: 'Custom Print', thisProduct: 'Full 4-Colour', alternative: 'None', thisBetter: true },
      { feature: 'Cost', thisProduct: 'Low', alternative: 'High (Wood)', thisBetter: true },

      { feature: 'Moisture Resistance', thisProduct: 'Coated Options', alternative: 'Natural Resistance', thisBetter: false },
      { feature: 'Recyclability', thisProduct: '100% Recyclable', alternative: 'Requires Treatment', thisBetter: true },
    ],
    comparisonLabel: 'Wooden Box',
    manufacturingSteps: [
      { step: '01', title: 'Paper Selection', desc: 'Selecting Kraft liner and fluting medium based on required burst strength and BCT values.' },
      { step: '02', title: 'Corrugation', desc: 'Single or double-wall corrugation on automated corrugator lines with glue application.' },
      { step: '03', title: 'Die Cutting & Scoring', desc: 'Computer-controlled die-cutting for precise crease lines and punching patterns.' },
      { step: '04', title: 'Printing', desc: 'Up to 4-colour flexographic printing with UV-resistant inks for long shelf life.' },
      { step: '05', title: 'QC & Dispatch', desc: 'ECT, BCT and Cobb testing on each production batch before packing and dispatch.' },
    ],
    relatedBlogs: [
      { title: 'Corrugated vs Plywood vs Solid Wood', slug: 'choosing-right-export-box', img: '/images/banners/4.png', cat: 'Materials' },
    ],
    faq: [
      { q: 'What is the difference between 3 ply and 9 ply corrugated boxes?', a: '3 ply (single wall) is ideal for light goods under 10 kg. 5 ply (double wall) handles 10–30 kg. 7 ply (triple wall) handles up to 100 kg, and 9 ply (quad wall) is used for extreme industrial goods up to 250 kg with the highest compression resistance.' },
      { q: 'Can I get custom printing on corrugated boxes?', a: 'Yes. We offer up to 4-colour flexographic printing including logos, barcodes, handling instructions, and regulatory markings. Minimum quantities apply for printed orders.' },
      { q: 'What is burst strength (BS)?', a: 'Burst strength (kg/cm²) measures how much hydrostatic pressure a box wall can withstand before rupturing. Higher BS means better resistance to punctures and impact damage. Our boxes offer BS up to 14 kg/cm².' },
      { q: 'What is BCT (Box Compression Test)?', a: 'BCT measures the maximum load a filled box can sustain before collapsing under vertical compression. It is critical for multi-tier stacking in warehouses. We test and certify BCT values for every production run.' },
      { q: 'Do you make moisture-resistant corrugated boxes?', a: 'Yes. We offer wax-coated and poly-coated corrugated boxes that significantly resist water absorption, making them ideal for cold-chain, agri-produce, and humid climate exports.' },
      { q: 'What is the minimum order quantity for corrugated boxes?', a: 'MOQ is typically 500 units for standard sizes. For custom-printed or die-cut designs, MOQ may vary (usually 1,000+ units). We can accommodate smaller trial orders for new clients.' },
      { q: 'What flute types do you offer?', a: 'We offer B-flute (fine, ideal for retail), C-flute (standard, most common), E-flute (very fine, used for inner dividers), and BC double-wall for heavy industrial packaging.' },
      { q: 'Can I get a sample before placing a bulk order?', a: 'Yes. We dispatch physical samples (plain or printed) within 3–5 working days on request. Sample charges may apply and are adjusted against the first bulk order.' },
      { q: 'What is the lead time for custom corrugated boxes?', a: 'Standard plain boxes are ready in 4–5 working days. Custom-printed or die-cut designs require 7–10 working days including plate creation and approval.' },
      { q: 'Are your corrugated boxes suitable for air freight?', a: 'Yes. We manufacture lightweight, high-BCT corrugated boxes optimized for air freight compliance, considering dimensional weight and airline cargo requirements.' },
    ],
    caseStudy: { client: 'Auto Component Manufacturer, Nashik', result: '45% reduction in transit damage claims', detail: 'By switching from a 3-ply to 5-ply custom-printed corrugated solution, a Tier-1 auto component supplier reduced in-transit damage from 6.2% to under 1%.' },
    images: ['/images/banners/2.png', '/images/banners/banner_action.png', '/images/banners/3.png'],
    seoContent: `Europack is a leading corrugated box manufacturer in India, supplying 3 ply, 5 ply, 7 ply and 9 ply corrugated packaging boxes for FMCG, pharmaceutical, automotive, e-commerce, and export industries. Our corrugated packaging solutions are manufactured at our ISO 9001:2015 certified facilities in Mumbai and are exported to clients across India and internationally.

We specialize in custom corrugated boxes with brand printing, moisture-resistant coatings, and UN-certified designs for dangerous goods. Our corrugated cartons meet IS:2771 Indian standard specifications and are tested for burst strength, edge crush test (ECT), and box compression test (BCT) to ensure reliable protection for your product throughout the supply chain.`,
  },

  'seaworthy-packing': {
    subtitle: 'Multi-Layer Barrier Packaging for Protection on Long Sea Voyages',
    tagline: 'Zero Corrosion. Zero Moisture. Delivered Intact.',
    overview: `As a leading manufacturer and exporter from India, Europack specializes in high-performance Seaworthy Packing and premium Pine Wood Box solutions. Our industrial-grade pinewood packaging is engineered for maximum durability, ensuring your heavy machinery and export cargo withstand the rigorous stresses of maritime transport. 

From heat-treated ISPM-15 wooden boxes to multi-layer barrier protection, we provide end-to-end export packaging services. Our seaworthy systems combine structural integrity with advanced preservation techniques like VCI films and silica gel, maintaining a corrosion-free environment for up to 12 months in transit and 2 years of on-site storage.`,
    specs: [
      { key: 'Barrier Layer', value: 'VCI + Poly Laminated Film' },
      { key: 'Desiccant', value: 'Silica Gel / Clay Type' },
      { key: 'Humidity Control', value: 'RH < 40% maintained' },
      { key: 'VCI Emission Life', value: '24+ months' },
      { key: 'Inner Seal', value: 'Vacuum heat-sealed' },
      { key: 'Outer Layer', value: 'HDPE/PP Woven Fabric + Foil' },
      { key: 'Compliance', value: 'ISO 9001, VCI MIL-PRF-3150' },
      { key: 'Suitable For', value: 'Metals, Machinery, auto parts' },
      { key: 'Lead Time', value: '2–5 Working Days' },
      { key: 'Deployment', value: 'On-site mobile team available' },
    ],
    benefits: [
      { icon: Shield, title: 'Rust Proof', desc: 'VCI molecules form an invisible protection layer on all metal surfaces inside the package.' },
      { icon: Globe, title: 'Sea-Zone Tested', desc: 'Validated for 90-day sea journeys including exposure to salt air and humidity cycling.' },
      { icon: Zap, title: 'No Clean-Up Needed', desc: 'Unlike oil preservation, VCI packets leave zero residue — parts are ready to use on arrival.' },
      { icon: Award, title: 'MIL-Spec Grade', desc: 'Our VCI films meet US Military performance standard MIL-PRF-3150 for corrosion prevention.' },
    ],
    applications: [
      { icon: Box, title: 'Pinewood Box Solutions', desc: 'Custom Pine Wood Boxes and Export Packing Cases for heavy industrial cargo.' },
      { icon: Truck, title: 'Heavy Machinery Packing', desc: 'Specialized structural skids and crates for oversized machinery and CNC units.' },
      { icon: Shield, title: 'ISPM-15 Standard', desc: 'Heat-treated and fumigated wooden packing compliant with international export norms.' },
      { icon: Zap, title: 'Electrical Panels', desc: 'Vacuum-sealed seaworthy packaging for sensitive instruments and power panels.' },
      { icon: Anchor, title: 'Seaworthy Export', desc: 'Comprehensive maritime protection for valves, pipes, and structural steel sections.' },
      { icon: Factory, title: 'Industrial Logistics', desc: 'Mobile packing teams for on-site services in Pune, Mumbai, and industrial hubs.' },
    ],
    comparison: [
      { feature: 'Rust Prevention', thisProduct: 'VCI Molecular Layer', alternative: 'Surface Oil Coat', thisBetter: true },
      { feature: 'Clean on Arrival', thisProduct: 'Zero Residue', alternative: 'Oil Must Be Cleaned', thisBetter: true },
      { feature: 'Protection Duration', thisProduct: '24 Months', alternative: '3–6 Months', thisBetter: true },
      { feature: 'Application Speed', thisProduct: 'Wrap & Seal', alternative: 'Labour Intensive', thisBetter: true },
      { feature: 'Cost per Unit', thisProduct: 'Moderate', alternative: 'Low (Oil Only)', thisBetter: false },
      { feature: 'MIL-Spec Compliance', thisProduct: 'MIL-PRF-3150', alternative: 'Not Compliant', thisBetter: true },
    ],
    comparisonLabel: 'Traditional Oil Preservation',
    manufacturingSteps: [
      { step: '01', title: 'Assessment', desc: 'Cargo assessment for metal type, transit duration, humidity corridor, and destination climate.' },
      { step: '02', title: 'VCI Selection', desc: 'Selecting the correct VCI formulation (ferrous, non-ferrous, or multi-metal) for the cargo.' },
      { step: '03', title: 'Desiccant Sizing', desc: 'Calculating desiccant quantity using cargo volume, packing material permeability, and voyage duration.' },
      { step: '04', title: 'Packing & Sealing', desc: 'On-site or factory packing with VCI film wrap, desiccant placement, and hermetic heat-sealing.' },
      { step: '05', title: 'Documentation', desc: 'Packing certificates, humidity indicator status, and compliance documentation provided for customs.' },
    ],
    relatedBlogs: [
      { title: 'VCI Packaging: How to Protect Ferrous Metals', slug: 'vci-packaging-metal-protection', img: '/images/banners/3.png', cat: 'Innovation' },
    ],
    faq: [
      { q: 'What is VCI and how does it work?', a: 'VCI (Volatile Corrosion Inhibitor) compounds emit molecules that adsorb on metal surfaces, forming an invisible protective layer that prevents corrosion without touching the surface. They\'re effective in sealed packages without direct contact.' },
      { q: 'How long does VCI protection last?', a: 'Our VCI formulations provide protection for up to 24 months in a properly sealed package. For longer storage, we recommend periodic inspection and re-application.' },
      { q: 'Can seaworthy packing be used for air freight?', a: 'Absolutely. Seaworthy packing is effective for all modes of transport. It is particularly useful for any long transit time regardless of channel, including combined multimodal shipments.' },
      { q: 'What types of metals does VCI protect?', a: 'We offer VCI formulations for ferrous metals (steel, iron), non-ferrous metals (copper, brass, aluminum), and multi-metal configurations that protect mixed assemblies in a single package.' },
      { q: 'Is seaworthy packing mandatory for export?', a: 'While not always legally mandatory, it is strongly recommended or required by most marine insurance policies for metal goods shipped over ocean freight. Many buyers also specify it in their purchase orders.' },
      { q: 'Do you offer on-site packing services?', a: 'Yes. We deploy mobile packing teams to your factory floor or warehouse for on-site seaworthy packing, including VCI treatment, desiccant placement, and documentation.' },
      { q: 'What desiccants do you use?', a: 'We use silica gel (Type A), clay desiccants, and molecular sieve desiccants depending on the cargo type, voyage duration, and container environment requirements.' },
      { q: 'Can I get a packing certificate for customs?', a: 'Yes. We provide a full packing certificate documenting the VCI type, desiccant quantity, sealing method, and compliance standard used — accepted by most customs authorities and marine insurers.' },
      { q: 'How do I know if my cargo needs seaworthy packing?', a: 'Any metallic cargo shipped for more than 10 days by ocean freight is at significant corrosion risk. Contact our technical team for a free cargo assessment — we\'ll advise the right protection level.' },
      { q: 'What is the cost of seaworthy packing?', a: 'Cost depends on cargo dimensions, metal type, protection duration, and packing complexity. Contact us for a project-specific quote — we typically provide a full BOM costing within 24 hours.' },
    ],
    caseStudy: { client: 'Steel Component Exporter, Jamshedpur', result: 'Zero corrosion claims across 5 years', detail: 'Europack\'s seaworthy packing eliminated all rust-related insurance claims for a major steel components exporter, saving ₹25L+ annually in rejection/rework.' },
    images: ['/images/banners/3.png', '/images/banners/banner_main.png', '/images/banners/1.png'],
    procedure: {
      intro: "Our seaworthy packing procedure is designed to withstand the harshest maritime conditions and multiple cargo handling stages. We focus on structural reinforcement, hermetic sealing, and advanced moisture control to protect industrial goods for long-duration voyages and on-site storage.",
      steps: [
        {
          title: "Foundation & Structural Integrity",
          desc: "We use new, seasoned lumber for all crates and cases. For loads exceeding 1,000 kg, skid runners are integrated to ensure safe handling by heavy-duty forklifts and cranes.",
          items: ["ISPM-15 Heat Treated Pine", "Load-bearing Skid Runners", "Structural Cleats for Static Support"]
        },
        {
          title: "Hermetic Moisture Protection",
          desc: "All critical components are sealed in high-gauge waterproof plastic foil. We calculate and add precise quantities of silica gel (desiccant) to maintain a dry interior environment throughout the voyage.",
          items: ["Vacuum Heat-Sealing", "Calculated Silica Gel Dosage", "VCI Corrosion Barriers"]
        },
        {
          title: "Anti-Corrosion & Lubrication",
          desc: "Bright and machined surfaces are coated with industrial-grade rust preventatives. Internal machinery parts are treated with specialized lubricants containing oxidation inhibitors.",
          items: ["MIL-PRF-3150 Compliance", "Rust-Inhibiting Lubricants", "Precision Surface Coating"]
        },
        {
          title: "Cushioning & Fragile Cargo",
          desc: "We use non-hygroscopic materials like felt and polyester for padding. Wood shavings are strictly avoided to prevent moisture retention. Fragile items receive international 'Handle with Care' markings.",
          items: ["Impact-Absorbing Padding", "Shock Monitoring (Optional)", "International Hazard Symbols"]
        },
        {
          title: "Securing & Unitization",
          desc: "Packages are secured with un-annealed metal strapping. For containerized cargo, we optimize dimensions to maximize space while ensuring stability for 20' and 40' maritime containers.",
          items: ["High-Tension Steel Strapping", "Container-Optimized Dimensions", "Double-Crimp Safety Seals"]
        },
        {
          title: "Identification & Documentation",
          desc: "Every package is clearly stenciled and tagged for easy identification. We provide detailed packing lists and identification for spare parts required for commission and 2-year operation.",
          items: ["Detailed Packing Lists", "Individually Tagged Spares", "Red-Paint Operational Markings"]
        }
      ]
    },
    seoContent: `Europack provides professional seaworthy packing services and VCI packaging solutions for metal cargo, heavy machinery, and precision components exported via ocean freight from India. Our seaworthy packaging systems are used by major exporters in Mumbai, Jamshedpur, Pune, Vadodara, and across India's industrial belts.

We specialize in VCI film packaging, silica gel desiccant systems, hermetic barrier foil sealing, and complete multi-layer protection for long-haul ocean shipments. Our seaworthy packing solutions comply with MIL-PRF-3150, ISO 9001:2015, and marine insurance requirements, ensuring your cargo arrives in perfect condition regardless of transit duration or destination climate.`,
  },

  'vacuum-packing': {
    subtitle: 'Hermetic Vacuum Sealing for Precision Machinery & Electronics',
    tagline: 'Zero Atmosphere. Zero Moisture. Absolute Preservation.',
    overview: `Industrial vacuum packing is a specialized method of packaging heavy machinery and sensitive components by extracting all atmospheric air to create a hermetically sealed environment. This process ensures optimum protection against dust, dirt, and moisture, which are the primary causes of corrosion and structural deterioration.

Europack's vacuum sealing solutions are essential for a variety of products—from computer chips and paper documents to fragile instruments and rubber components—maintaining their original identity and significantly increasing shelf life. Our airtight packing provides a definitive barrier against dryness, wetness, and dehydration, ensuring your cargo remains intact throughout the global supply chain.`,
    specs: [
      { key: 'Seal Type', value: 'Hermetic Heat-Welded' },
      { key: 'Barrier Film', value: 'Multi-Layer Aluminum Foil' },
      { key: 'Moisture Removal', value: '100% Atmospheric Extraction' },
      { key: 'ESD Protection', value: 'Anti-Static Options Available' },
      { key: 'Outer Case', value: 'ISPM-15 Pine Wood / Plywood' },
      { key: 'Standards', value: 'ISO 9001:2015 & MIL-Spec' },
      { key: 'Deployment', value: 'On-Site Mobile Teams' },
    ],
    benefits: [
      { icon: Shield, title: 'Atmospheric Isolation', desc: 'Complete removal of air prevents oxidation, rusting, and the growth of mold or fungus on sensitive components.' },
      { icon: Zap, title: 'Compact & Secure', desc: 'The vacuum process makes the cargo more compact and immobilizes it within the seal, reducing transit vibration risks.' },
      { icon: Globe, title: 'Extreme Shelf Life', desc: 'Ideal for long-term preservation of critical spares, ensuring parts are in "factory-new" condition years after packing.' },
      { icon: BookOpen, title: 'Versatile Protection', desc: 'Safeguards everything from fragile electronics and paper documents to rubber and plastic goods from dehydration.' },
    ],
    applications: [
      { icon: Cpu, title: 'Precision Electronics', desc: 'Computer chips, circuit boards, and sensitive laboratory instruments.' },
      { icon: FileText, title: 'Critical Documents', desc: 'Long-term archiving of paper documents and high-value technical drawings.' },
      { icon: Factory, title: 'Heavy Machinery', desc: 'Industrial pumps, motors, and CNC units requiring zero-corrosion transit.' },
      { icon: Package, title: 'FMCG & Rubber', desc: 'Protection against dehydration and environmental aging for specialized materials.' },
    ],
    comparison: [
      { feature: 'Moisture Control', thisProduct: 'Total Air Extraction', alternative: 'Desiccant Only', thisBetter: true },
      { feature: 'Dust Protection', thisProduct: 'Hermetic Barrier', alternative: 'Standard Wrap', thisBetter: true },
      { feature: 'Shelf Life', thisProduct: 'Up to 5 Years', alternative: '6–12 Months', thisBetter: true },
      { feature: 'Compactness', thisProduct: 'Reduced Volume', alternative: 'Bulky Wrap', thisBetter: true },
    ],
    comparisonLabel: 'Standard Barrier Packing',
    manufacturingSteps: [
      { step: '01', title: 'Surface Prep', desc: 'Cleaning and stabilizing the product to ensure no trapped moisture or sharp edges.' },
      { step: '02', title: 'Barrier Shrouding', desc: 'Enclosing the item in a specialized multi-layer aluminum or VCI vacuum bag.' },
      { step: '03', title: 'Air Extraction', desc: 'Using high-pressure vacuum systems to remove 100% of internal atmosphere.' },
      { step: '04', title: 'Hermetic Sealing', desc: 'Precision heat-welding of the bag to create a permanent atmospheric seal.' },
    ],
    images: ['/images/products/user_vacuum_packing.png', '/images/banners/banner_main.png', '/images/banners/2.png'],
    procedure: {
      intro: "Our industrial vacuum packing process follows a rigorous quality-controlled sequence to ensure zero-defect preservation. We utilize advanced high-pressure air systems to create a durable seal that safeguards equipment against environmental contaminants during long-term storage or complex shipping routes.",
      steps: [
        {
          title: "Technological Precision",
          desc: "We make use of advanced modern techniques to produce the highest quality vacuum seals. Our systems go through multiple quality checks to ensure the packaging is without any deficiencies or defects.",
          items: ["Modern Extraction Tech", "Zero-Defect Quality Checks", "Advanced Sealing Units"]
        },
        {
          title: "Quality Sourcing",
          desc: "All raw materials required for our vacuum systems are procured from verified, known sources in the market. This ensures the material integrity necessary for centuries-old preservation techniques.",
          items: ["Verified Raw Materials", "High-Barrier Foils", "Premium Sealants"]
        },
        {
          title: "Customer-Centric Design",
          desc: "Our layouts are prepared only after a complete understanding of your requirements. Based on our experience, we provide valuable suggestions to optimize the orientation between the product and the packing system.",
          items: ["Custom Layout Planning", "Expert Technical Advice", "Product Orientation Optimization"]
        }
      ]
    },
    advantages: [
      "Increases the productive life of machinery by preventing environmental wear.",
      "Minimized overall packaging costs through efficient volume reduction.",
      "Complete protection from dirt, dust, and external elements that hamper products.",
      "High-pressure air seals provide superior moisture resistance.",
      "Enhanced security by keeping components intact and immobilized during shipping.",
      "Safeguards against potential damage, minimizing repair and rework costs."
    ],
    relatedBlogs: [
      { title: 'The Science of Industrial Vacuum Packaging', slug: 'industrial-vacuum-packing-science', img: '/images/banners/2.png', cat: 'Technical' },
    ],
    faq: [
      { q: 'How long can a product stay protected in vacuum packing?', a: 'Under optimal conditions and using our high-grade aluminum barrier foils, vacuum-packed items can remain protected for up to 5 years.' },
      { q: 'Is vacuum packing better than VCI?', a: 'Vacuum packing provides the highest level of protection by removing the air itself, while VCI is a chemical inhibitor. For extreme environments, we often combine both.' },
      { q: 'Can on-site vacuum packing be done for large machines?', a: 'Yes. Europack deploys mobile teams with portable high-capacity vacuum and sealing units to your factory or warehouse.' },
      { q: 'What materials are used in the vacuum bags?', a: 'We use specialized multi-layer laminates, often including a layer of aluminum foil, to provide the lowest possible Oxygen and Water Vapor Transmission Rates (OTR/WVTR).' },
    ],
    seoContent: `Europack is a premier manufacturer and supplier of industrial vacuum packing services in India. We provide hermetic sealing solutions for sensitive electronics, heavy machinery, and critical export cargo. 

Our vacuum packaging systems protect against corrosion, moisture, and environmental aging, ensuring your products remain in factory-new condition. Based in industrial hubs like Pune and Mumbai, Europack serves as a trusted partner for exporters requiring high-performance preservation packaging for global shipping.`,
  },

  'lashing-materials': {
    subtitle: 'Heavy-Duty Cargo Lashing & Sea Fastening for Global Transit',
    tagline: 'Secure. Compliant. Engineered for Heavy Loads.',
    overview: `Europack provides expert cargo lashing services designed to secure break bulk cargo, high-value assets, and heavy industrial equipment for maritime and overland transport. Our solutions are engineered to prevent shifting, sliding, or structural damage during the most demanding transit conditions, including deep-sea voyages and multimodal handling.

We specialize in securing everything from shipping containers and flat racks to yachts, heavy vehicles, and break-bulk machinery on barges and vessels. Using industrial-grade materials and rigorous fastening protocols, we ensure your cargo remains immobilized and protected from factory gate to final destination.`,
    specs: [
      { key: 'Load Capacity', value: 'Up to 20 Tons (Per Point)' },
      { key: 'Material Grades', value: 'High-Tensile Steel & Polyester' },
      { key: 'Standards', value: 'IMO CSS Code & CTU Guidelines' },
      { key: 'Fastening', value: 'Steel Wire, Chain & Ratchets' },
      { key: 'Surface Grip', value: 'D-Rings & Wheel Chocking' },
      { key: 'Compliance', value: 'International Maritime Regs' },
      { key: 'Deployment', value: 'On-site Port & Yard Services' },
    ],
    benefits: [
      { icon: Shield, title: 'Uncompromising Safety', desc: 'Properly secured cargo minimizes the risk of structural damage and prevents workplace accidents during handling.' },
      { icon: Globe, title: 'Regulatory Compliance', desc: 'Our services ensure full adherence to international shipping regulations, avoiding costly fines and penalties.' },
      { icon: Zap, title: 'Cost-Effectiveness', desc: 'Reduce insurance premiums and eliminate expensive repair or replacement costs caused by transit damage.' },
      { icon: BookOpen, title: 'Efficiency & Speed', desc: 'Expertly lashed cargo moves faster through ports with zero delays caused by load shifting or inspection failures.' },
    ],
    applications: [
      { icon: Anchor, title: 'Sea Fastening', desc: 'Heavy-duty lashing of cargo on barges, vessels, and flat-rack containers.' },
      { icon: Ship, title: 'Yacht Lashing', desc: 'Precision securing of luxury yachts and watercraft for international shipping.' },
      { icon: Truck, title: 'Vehicle Securing', desc: 'Ro-Ro and containerized securing of automobiles, trucks, and heavy plant machinery.' },
      { icon: Package, title: 'Break Bulk', desc: 'Immobilization of oversized industrial components and non-containerized cargo.' },
    ],
    comparison: [
      { feature: 'Load Stability', thisProduct: 'Dynamic Tensioning', alternative: 'Static Blocking', thisBetter: true },
      { feature: 'Compliance', thisProduct: 'IMO/CTU Certified', alternative: 'Standard Grade', thisBetter: true },
      { feature: 'Stress Resistance', thisProduct: 'Multi-Axis Fastening', alternative: 'Single-Point Only', thisBetter: true },
      { feature: 'Durability', thisProduct: 'Weatherproof Steel', alternative: 'Standard Poly', thisBetter: true },
    ],
    comparisonLabel: 'Basic Blocking & Bracing',
    manufacturingSteps: [
      { step: '01', title: 'Load Assessment', desc: 'Calculating center of gravity, weight distribution, and required lashing points based on cargo dimensions.' },
      { step: '02', title: 'Material Selection', desc: 'Choosing between steel wire ropes, lashing chains, or polyester webbings based on the cargo sensitivity.' },
      { step: '03', title: 'Rigging & Tension', desc: 'Applying lashing points using turnbuckles, load binders, and ratchet tie-downs for optimal tension.' },
      { step: '04', title: 'Stability Testing', desc: 'Verification of all fastening points to ensure zero movement under simulated transit stresses.' },
    ],
    images: ['/images/products/user_lashing_materials.jpg', '/images/banners/banner_action.png', '/images/banners/4.png'],
    procedure: {
      intro: "Our cargo lashing protocol is engineered to neutralize the dynamic forces experienced during sea and overland transit. We combine high-tensile materials with specialized sea-fastening techniques to ensure absolute cargo immobilization on vessels, flat-racks, and barges.",
      steps: [
        {
          title: "Maritime Lashing Protocol",
          desc: "We use a sophisticated range of heavy-duty lashing materials to ensure absolute cargo immobilization. Our protocol follows IMO standards for sea transportation.",
          items: ["Steel Wire Ropes", "Lashing Chains", "Ratchet Tie Downs", "Turnbuckles"]
        },
        {
          title: "Securing Mechanisms",
          desc: "Precision hardware is used to create secure anchor points. We integrate D-rings, lashing shackles, and tension levers for multi-point stability.",
          items: ["D-Rings", "Lashing Shackles", "Tension Levers", "Load Binders"]
        },
        {
          title: "Vehicle & Specialty Cargo",
          desc: "For automobiles and heavy plant machinery, we employ wheel chocking and car-specific lashing systems to prevent longitudinal and lateral movement.",
          items: ["Wheel Chocking", "Car Lashing Straps", "Extension Handles"]
        }
      ]
    },
    relatedBlogs: [
      { title: 'Choosing the Right Lashing for Container Cargo', slug: 'container-lashing-guide', img: '/images/banners/4.png', cat: 'Logistics' },
    ],
    faq: [
      { q: 'What materials are best for heavy machinery lashing?', a: 'For heavy machinery (ODC), we typically recommend high-tensile lashing chains or steel wire ropes combined with turnbuckles for maximum tension and stability.' },
      { q: 'Is seaworthy lashing different from road lashing?', a: 'Yes. Sea lashing must withstand constant multi-axis movement (pitch, roll, and heave) and requires higher safety factors and specialized sea-fastening hardware.' },
      { q: 'Do you provide on-site lashing services at ports?', a: 'Yes. Our mobile lashing teams are available for on-site services at major ports (JNPT, Mundra, etc.), warehouses, and factory sites across India.' },
      { q: 'What standards do your lashing services follow?', a: 'We follow IMO (International Maritime Organization) CSS Code guidelines and CTU (Cargo Transport Unit) packing standards to ensure global compliance.' },
    ],
    seoContent: `Europack is a leading provider of professional cargo lashing services and lashing materials in India. We specialize in container lashing, yacht securing, and vehicle sea-fastening for international shipping and domestic transport.
    
Our expert lashing teams utilize high-tensile steel wire, turnbuckles, and ratchet systems to ensure your break-bulk cargo and oversized equipment remain secure on barges, vessels, and flat racks. Adhering to international maritime safety standards, Europack provides the reliability and compliance required for high-value export logistics.`,
  },

  'default': {
    subtitle: 'Industrial Grade Packaging Engineered for Global Export Standards',
    tagline: 'Built Tough. Shipped Safe. Delivered Right.',
    overview: `Europack delivers end-to-end industrial packaging solutions for India's most demanding export sectors. With Pan India presence across multiple locations and a team of specialists, we design and produce packaging systems that protect high-value cargo throughout every stage of the global supply chain.

From heavy ODC machinery to pharmaceutical-grade corrugated boxes, every Europack product is manufactured to international compliance standards including ISPM-15, ISO 9001:2015, and MIL-Spec — ensuring your shipments clear customs and arrive intact.`,
    specs: [
      { key: 'Standard', value: 'ISO 9001:2015 Compliant' },
      { key: 'Certification', value: 'ISPM-15 / MIL-Spec' },
      { key: 'Capacity', value: 'Heavy Duty — Contact for Range' },
      { key: 'Lead Time', value: '3–7 Working Days' },
      { key: 'MOQ', value: '50 Units (Standard)' },
      { key: 'Delivery', value: 'Pan-India + Port Delivery' },
      { key: 'Customization', value: 'Available on Request' },
      { key: 'Warranty', value: '100% Quality Guaranteed' },
    ],
    benefits: [
      { icon: Shield, title: 'Certified Quality', desc: 'Every product meets international packaging compliance standards for global trade.' },
      { icon: Globe, title: 'Export Ready', desc: 'Validated for major global shipping corridors — US, EU, Australia, Middle East.' },
      { icon: Zap, title: 'Fast Delivery', desc: 'Rapid manufacturing and dispatch to ensure your export timelines are never compromised.' },
      { icon: Award, title: '33+ Years Experience', desc: 'Backed by three decades of packaging engineering expertise for industrial exports.' },
    ],
    applications: [
      { icon: Factory, title: 'Heavy Machinery', desc: 'Engineering-grade packaging for turbines, CNC machines, and industrial equipment.' },
      { icon: Truck, title: 'Export Shipping', desc: 'Compliance-ready packaging for international freight corridors.' },
      { icon: HeartPulse, title: 'Pharmaceuticals', desc: 'Hygienic, controlled-humidity packaging for sensitive medical cargo.' },
      { icon: Package, title: 'Automotive OEM', desc: 'Precision packaging for CKD kits and high-value auto components.' },
      { icon: FlaskConical, title: 'Chemical Sector', desc: 'UN-certified packaging for hazardous and non-hazardous chemical goods.' },
      { icon: HardHat, title: 'Defense & Aerospace', desc: 'MIL-SPEC compliant packaging for sensitive defense equipment.' },
    ],
    comparison: [
      { feature: 'Compliance', thisProduct: 'Full Certification', alternative: 'Varies', thisBetter: true },
      { feature: 'Engineering Support', thisProduct: 'Free CAD Design', alternative: 'None', thisBetter: true },
      { feature: 'Lead Time', thisProduct: '3–7 Days', alternative: '10–15 Days', thisBetter: true },
      { feature: 'Pan-India Delivery', thisProduct: 'Yes', alternative: 'Limited', thisBetter: true },
      { feature: 'Port Delivery', thisProduct: 'All Major Ports', alternative: 'Varies', thisBetter: true },
      { feature: 'Custom Engineering', thisProduct: 'Included', alternative: 'Extra Cost', thisBetter: true },
    ],
    comparisonLabel: 'Generic Supplier',
    manufacturingSteps: [
      { step: '01', title: 'Requirement Analysis', desc: 'Cargo dimensions, weight, transit route, and compliance requirements assessed.' },
      { step: '02', title: 'Design Engineering', desc: 'CAD-based structural design and load calculation for your specific cargo.' },
      { step: '03', title: 'Material Selection', desc: 'Optimal materials sourced based on cargo type, journey duration, and destination.' },
      { step: '04', title: 'Manufacturing', desc: 'Precision fabrication at our ISO 9001 certified manufacturing hubs.' },
      { step: '05', title: 'QC & Dispatch', desc: 'Full quality inspection, documentation, and delivery to your facility or port.' },
    ],
    relatedBlogs: [
      { title: 'ISPM-15 Complete Guide for Exporters', slug: 'ispm-15-complete-guide', img: '/images/banners/1.png', cat: 'Compliance' },
      { title: 'The Physics of Ocean Lashing', slug: 'post=3883', img: '/images/banners/2.png', cat: 'Technical' },
    ],
    faq: [
      { q: 'What certifications does Europack hold?', a: 'Europack is ISO 9001:2015 certified and is a registered ISPM-15 heat-treatment facility with the IPPC. We also comply with MIL-PRF-3150, IMO CTU Code, and INCOTERMS packaging standards.' },
      { q: 'Do you offer custom packaging solutions?', a: 'Yes. We provide fully customized packaging engineering including CAD drawings and load calculations for each project.' },
      { q: 'What is your delivery lead time?', a: 'Standard products ship in 3-5 working days. Custom orders require 5-10 days depending on complexity.' },
      { q: 'Do you provide on-site packing services?', a: 'Yes. We deploy mobile packing teams to your factory or warehouse for on-site packing, lashing, and documentation anywhere in India.' },
      { q: 'Can Europack handle ODC (Out of Dimension Container) cargo?', a: 'Absolutely. ODC packaging is one of our core specialisations. We engineer custom crates, lashing systems, and VCI protection for multi-ton oversized machinery.' },
      { q: 'What is your geographic coverage?', a: 'We serve clients pan-India from our manufacturing hubs in Bhiwandi (Mumbai), Jamshedpur, and Vadodara with delivery to all major industrial zones and ports.' },
      { q: 'Do you provide packing documentation for customs?', a: 'Yes. We provide full packing lists, certificates of treatment, phytosanitary documentation, and photo evidence for every shipment.' },
      { q: 'What is your MOQ?', a: 'MOQ varies by product: pallets start at 50 units, corrugated boxes at 500 units, and custom crates are quoted per project without fixed MOQ.' },
      { q: 'Do you offer complete turnkey packaging solutions?', a: 'Yes. Europack can handle the complete packaging process — design, material supply, packing, lashing, documentation, and delivery — as a single-vendor solution.' },
      { q: 'How do I get a quote from Europack?', a: 'Submit an enquiry through this page, call our sales team, or WhatsApp us your cargo details. We typically respond with a preliminary quote within 24 hours.' },
    ],
    caseStudy: { client: 'Industrial Manufacturer', result: 'Zero damage during transit', detail: 'Europack provided complete packaging engineering services resulting in zero in-transit damage across multiple international shipments.' },
    images: ['/images/banners/banner_main.png', '/images/banners/1.png', '/images/banners/2.png'],
    seoContent: `Europack Industries is a leading industrial packaging manufacturer in India with Pan India presence across multiple locations in export packaging, wooden crates, wooden pallets, corrugated boxes, seaworthy packing, VCI packaging, stretch wrapping, and lashing solutions. We serve clients across heavy engineering, automotive, pharmaceutical, chemical, defense, and FMCG sectors. Our manufacturing facilities provide pan-India delivery and on-site packing services.`,
  }
};

function getContent(slug: string) {
  return productContent[slug] || productContent['default'];
}

const productImageMap: Record<string, string> = {
  '/images/products/four-way-pallets.webp': '/images/products/four-way-pallets.webp',
  '/images/products/corrugatedBoxes.png': '/images/products/corrugatedBoxes.png',
  '/images/products/user_dunnage_bag.webp': '/images/products/user_dunnage_bag.webp',
  '/images/products/user_seaworthy_laminates.jpg': '/images/products/user_seaworthy_laminates.jpg',
  '/images/products/user_lashing_materials.jpg': '/images/products/user_lashing_materials.jpg',
  '/images/products/user_vacuum_packing.png': '/images/products/user_vacuum_packing.png',
};

function getImageUrl(path: string) {
  if (!path) return '/images/banners/banner_main.png';
  if (path.startsWith('http') || path.startsWith('/images/banners')) return path;
  if (productImageMap[path]) return productImageMap[path];
  if (path.startsWith('/')) return `http://localhost:5002${path}`;
  return `http://localhost:5002/${path}`;
}

// =====================================================
// SECTION HEADING COMPONENT
// =====================================================
function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className="h-1 w-12 bg-[#FF6600] shrink-0" />
      <div>
        <p className="text-[10px] font-black text-[#FF6600] uppercase tracking-widest mb-1">{label}</p>
        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter uppercase">{title}</h2>
      </div>
    </div>
  );
}

// =====================================================
// MAIN COMPONENT
// =====================================================
export default function ProductDetailClient({
  product,
  allProducts,
}: {
  product: Product;
  allProducts: Product[];
}) {
  const content = getContent(product.slug);
  const [activeImage, setActiveImage] = useState(getImageUrl(product.image));
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const relatedProducts = allProducts.filter(p => p.slug !== product.slug).slice(0, 6);
  const allImages = [getImageUrl(product.image), ...content.images].filter((v, i, a) => a.indexOf(v) === i).slice(0, 5);

  const whatsappMsg = encodeURIComponent(`Hi Europack, I'm interested in ${product.title}. Please send me a quote.`);
  const whatsappUrl = `https://wa.me/919820090775?text=${whatsappMsg}`;

  return (
    <div className="bg-white min-h-screen">

      {/* ── MOBILE STICKY CTA ── */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-50 flex gap-3">
        <button onClick={() => setIsQuoteOpen(true)} className="flex-1 flex items-center justify-center gap-2 bg-[#FF6600] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl">
          <MessageSquare size={16} /> Get Quote
        </button>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl no-underline">
          WhatsApp
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">

        {/* ── BREADCRUMB ── */}
        <nav className="flex items-center gap-2 text-[10px] font-black text-slate-400 mb-12 tracking-widest uppercase overflow-x-auto no-scrollbar">
          <Link href="/" className="hover:text-[#FF6600] transition-colors shrink-0">Home</Link>
          <ChevronRight size={12} className="shrink-0" />
          <Link href="/products" className="hover:text-[#FF6600] transition-colors shrink-0">Products</Link>
          <ChevronRight size={12} className="shrink-0" />
          <span className="text-[#FF6600] truncate">{product.category}</span>
          <ChevronRight size={12} className="shrink-0" />
          <span className="text-slate-600 truncate">{product.title}</span>
        </nav>

        {/* ═══════════════ SECTION 1: HERO ═══════════════ */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24 lg:mb-32">

          {/* LEFT: Content */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 bg-orange-50 text-[#FF6600] text-[10px] font-black uppercase tracking-[0.25em] px-4 py-2 rounded-full mb-6">
              <Package size={12} /> {product.category}
            </div>

            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.05] tracking-tighter mb-3">
              {product.title}
            </h1>
            <p className="text-base text-[#FF6600] font-black uppercase tracking-widest mb-4">{content.subtitle}</p>
            <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">{product.description}</p>

            {/* Key Features */}
            <div className="space-y-2.5 mb-8">
              {product.features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#FF6600] shrink-0" />
                  <span className="text-sm font-semibold text-slate-700">{f}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="flex-1 flex items-center justify-center gap-3 bg-[#FF6600] text-white px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-[#CC5200] transition-all shadow-xl shadow-orange-100 group whitespace-nowrap"
                >
                  Get Expert Quote <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="/Europack-Brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 bg-slate-900 text-white px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all no-underline group whitespace-nowrap"
                >
                  Brochure <FileText size={16} className="group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 bg-[#25D366] text-white px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-[#1DA851] transition-all no-underline whitespace-nowrap"
                >
                  WhatsApp Now
                </a>
              </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
              {['ISPM-15 Certified', 'ISO 9001:2015', 'Pan India Presence', 'Multiple Locations'].map((b, i) => (
                <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600">
                  {b}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Image Gallery */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[4/3] rounded-[40px] overflow-hidden bg-slate-50 border border-slate-100 relative group">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute top-6 left-6 bg-[#FF6600] text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest">
                {product.category}
              </div>
            </div>


            {/* Tagline card */}
            <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent" />
              <div className="relative flex items-start gap-4">
                <Award className="text-[#FF6600] shrink-0 mt-1" size={24} />
                <div>
                  <p className="font-black text-lg tracking-tight">{content.tagline}</p>
                  <p className="text-slate-400 text-xs mt-1">Backed by Pan India presence across multiple locations</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════ SECTION 2: PRODUCT OVERVIEW ═══════════════ */}
        <section className="mb-24">
          <SectionHeading label="Product Overview" title="What Is This Product?" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-slate-50 rounded-3xl p-10 border border-slate-100">
              <div className="prose prose-slate max-w-none">
                {content.overview.split('\n\n').map((para, i) => (
                  <p key={i} className="text-slate-600 leading-relaxed text-sm mb-4 last:mb-0">{para}</p>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[
                { num: 'Pan India', label: 'Presence' },
                { num: 'Multiple', label: 'Locations' },
                { num: '100%', label: 'Quality Guaranteed' },
                { num: 'National', label: 'Network' },
              ].map((stat, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-3xl font-black text-[#FF6600]">{stat.num}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* ═══════════════ SECTION: TYPES OF WOODEN PALLETS (Wooden Pallets Only) ═══════════════ */}
        {product.slug === 'wooden-pallets' && (
          <section className="mb-24">
            <SectionHeading label="Catalog" title="Types of Wooden Pallets" />
            <p className="text-sm text-slate-500 mb-8 max-w-2xl">
              There are many types of wooden pallets tailored for specific industrial needs, some of which include:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Two Way Pallets",
                "Four Way Pallets (Non-Reversible & Reversible)",
                "Euro Pallets",
                "Pinewood Four Way Pallets",
                "CP 1 to CP-9 Wooden Pallets",
                "Ply Wood Pallets",
                "Plastic Pallets",
                "Heat Treated & Fumigated Export pallets"
              ].map((type, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-3 hover:border-orange-200 hover:shadow-md transition-all">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-[#FF6600] shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{type}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-slate-900 rounded-2xl text-white flex items-center gap-4">
              <Shield className="text-[#FF6600] shrink-0" size={24} />
              <p className="text-sm font-medium">
                Before delivery, every unit is strictly tested on various parameters to assure their quality and durability.
              </p>
            </div>
          </section>
        )}

        {/* ═══════════════ SECTION: LASHING MATERIALS SOLUTIONS (Lashing Materials Only) ═══════════════ */}
        {product.slug === 'lashing-materials' && (
          <section className="mb-24">
            <SectionHeading label="Catalog" title="Heavy-Duty Lashing Equipment" />
            <p className="text-sm text-slate-500 mb-8 max-w-2xl">
              We utilize a comprehensive range of industrial-grade lashing materials to ensure absolute cargo security during transit:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Steel Wire Ropes",
                "Ratchet Tie Downs",
                "Lashing Extension Handles",
                "Tension Levers",
                "High-Tensile Lashing Chains",
                "Heavy-Duty Turnbuckles",
                "Wire Clips for Ropes",
                "Car Lashing Systems",
                "Industrial D-Rings",
                "Lashing Shackles",
                "Load Binders",
                "Load Binder Chains",
                "Wheel Chocking Systems",
                "Container Lashing Rods",
                "Twist Locks",
                "Bridge Fittings"
              ].map((type, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-3 hover:border-orange-200 hover:shadow-md transition-all">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-[#FF6600] shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{type}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══════════════ SECTION: SEAWORTHY PACKING SOLUTIONS (Seaworthy Packing Only) ═══════════════ */}
        {product.slug === 'seaworthy-packing' && (
          <section className="mb-24">
            <SectionHeading label="Catalog" title="Seaworthy Packing Solutions" />
            <p className="text-sm text-slate-500 mb-8 max-w-2xl">
              We offer a wide range of specialized export packaging solutions designed for maritime transit:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Pinewood Export Packing",
                "Pine Wood Box",
                "Wooden Packing boxes",
                "Heavy Machinery Packing",
                "Fumigation Wooden Packing",
                "Fumigation Of Export Cargo",
                "Cargo Boxes",
                "Pine Wood Packaging",
                "Seaworthy Export Wooden Packaging Services",
                "Wooden Packaging",
                "Sea Worthy Solutions",
                "Seaworthy Packing ISPM 15",
                "Export Packaging Services",
                "Heat Treatment For Wooden Packaging",
                "Seaworthy Packing",
                "Industrial Packaging",
                "Pine Wood Boxes",
                "Packaging Boxes",
                "Pine Wood",
                "ISPM 15 Wooden Box",
                "Export Quality Packaging"
              ].map((type, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-3 hover:border-orange-200 hover:shadow-md transition-all">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-[#FF6600] shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{type}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══════════════ SECTION: TYPES OF WOOD (Wooden Pallets Only) ═══════════════ */}
        {product.slug === 'wooden-pallets' && (
          <section className="mb-24">
            <SectionHeading label="Materials" title="Types of wood used for pallets" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Pine wood", desc: "Most common for standard export pallets." },
                { name: "Rubber wood", desc: "Durable and sustainable choice for domestic use." },
                { name: "Jungle wood", desc: "High-density hardwood for extreme loads." },
                { name: "Ply wood", desc: "Lightweight and ISPM-15 exempt by design." }
              ].map((wood, i) => (
                <div key={i} className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-orange-200 transition-all">
                  <h3 className="text-lg font-black text-slate-900 mb-2">{wood.name} for Pallets</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{wood.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}



        {/* ═══════════════ SECTION 4: KEY BENEFITS ═══════════════ */}
        <section className="mb-24">
          <SectionHeading label="Why Choose This Product" title="Key Benefits" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-lg hover:border-orange-100 transition-all group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#FF6600] mb-5 shadow-sm group-hover:bg-[#FF6600] group-hover:text-white transition-all">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2 tracking-tight">{b.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════ SECTION 5: APPLICATIONS ═══════════════ */}
        <section className="mb-24">
          <SectionHeading label="Industry Use Cases" title="Applications" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.applications.map((app, i) => {
              const Icon = app.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-8 bg-white rounded-3xl border border-slate-100 hover:shadow-xl hover:border-orange-100 transition-all group cursor-default"
                >
                  <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF6600] mb-5 group-hover:bg-[#FF6600] group-hover:text-white transition-all">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-base font-black text-slate-900 mb-2 uppercase tracking-wide">{app.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{app.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>



        {/* ═══════════════ SECTION 8: PACKAGING & DELIVERY ═══════════════ */}
        <section className="mb-24">
          <SectionHeading label="Logistics & Supply" title="Packaging & Delivery" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Package,
                title: 'Bulk Supply Available',
                desc: 'We supply in bulk quantities for manufacturing plants, freight forwarders, and large exporters. Volume discounts available.'
              },
              {
                icon: Truck,
                title: 'Pan India Delivery',
                desc: 'Delivery to all major industrial zones, warehouses, and factory gates across India. Free delivery for orders above threshold volumes.'
              },
              {
                icon: Globe,
                title: 'Port & Export Support',
                desc: 'Direct delivery to JNPT, Mundra, Chennai, Vizag, and Kolkata ports, coordinated with your freight forwarder.'
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-[#1A1F2C] rounded-3xl p-8 text-white relative overflow-hidden group hover:bg-[#FF6600] transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-[#FF6600] mb-5 group-hover:bg-white/20 transition-colors">
                      <Icon size={26} />
                    </div>
                    <h3 className="text-base font-black uppercase tracking-wide mb-3">{item.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════ SECTION 9: WHY CHOOSE EUROPACK ═══════════════ */}
        <section className="mb-24 bg-slate-50 rounded-[48px] p-10 md:p-16 border border-slate-100">
          <SectionHeading label="Our Edge" title="Why Choose Europack" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'Pan India Presence', desc: 'We have Pan India presence across multiple locations for industrial packaging excellence.' },
              { icon: Shield, title: 'Trusted Globally', desc: 'Trusted by major companies, Tier-1 OEMs, and mid-size exporters alike.' },
              { icon: Wrench, title: 'Custom Solutions', desc: 'No off-the-shelf compromises. Every solution engineered to your exact specifications.' },
              { icon: Zap, title: 'Fast Lead Times', desc: 'Standard products delivered across India with priority production and dispatch.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-[#FF6600] mb-5 group-hover:bg-[#FF6600] group-hover:text-white transition-all">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-base font-black text-slate-900 mb-2 uppercase tracking-wide">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>


        {/* ═══════════════ SECTION: TECHNICAL PROCEDURE (If available) ═══════════════ */}
        {content.procedure && (
          <section className="mb-24">
            <SectionHeading label="Technical Protocol" title={`${product.title} Procedure`} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-8">
                <p className="text-sm text-slate-500 leading-relaxed">
                  {content.procedure.intro || `Our ${product.title.toLowerCase()} procedure is designed to meet international standards for industrial protection and cargo safety.`}
                </p>
                <div className="space-y-6">
                  {(Array.isArray(content.procedure) ? content.procedure : content.procedure.steps).map((step: any, i: number) => (
                    <div key={i} className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all border-l-4 border-l-[#FF6600]">
                      <h3 className="text-lg font-black text-slate-900 mb-2 uppercase tracking-tight">{step.title}</h3>
                      <p className="text-sm text-slate-500 mb-4 leading-relaxed">{step.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {step.items.map((item: any, j: number) => (
                          <span key={j} className="px-3 py-1 bg-orange-50 text-[#FF6600] text-[10px] font-bold rounded-lg uppercase tracking-wide">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent" />
                  <div className="relative">
                    <h3 className="text-xl font-black uppercase mb-6 text-[#FF6600]">Vendor Obligations</h3>
                    <ul className="space-y-4">
                      {[
                        "Sole responsibility for structural packing and CARGO marking.",
                        "Liability for proper protection for up to 6 months of storage.",
                        "Compliance with transit conditions for 1-year journey cycles.",
                        "Provision of advanced storage recommendations for 2-year on-site periods.",
                        "Strict adherence to ISPM-15 and MIL-SPEC moisture barrier standards."
                      ].map((text, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                          <CheckCircle2 size={18} className="text-[#FF6600] shrink-0 mt-0.5" />
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-orange-50 rounded-[48px] p-10 border border-orange-100">
                  <h3 className="text-xl font-black uppercase mb-6 text-slate-900">Maritime Stress Factors</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    While maritime transit involves humidity and salt air, the most severe stresses occur during <strong>cargo handling</strong> (impact, pushing, overturning). Our packaging is engineered to resist these physical impacts through:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Impact Resistance", value: "Cleated Sheathing" },
                      { label: "Static Load", value: "Skid Runners" },
                      { label: "Corrosion", value: "VCI Barriers" },
                      { label: "Moisture", value: "Desiccant Systems" }
                    ].map((stat, i) => (
                      <div key={i} className="bg-white p-4 rounded-2xl border border-orange-200">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                        <p className="text-sm font-black text-slate-900">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════ SECTION 11: RELATED PRODUCTS ═══════════════ */}
        <section className="mb-24">
          <div className="flex items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-4">
              <div className="h-1 w-12 bg-[#FF6600]" />
              <div>
                <p className="text-[10px] font-black text-[#FF6600] uppercase tracking-widest mb-1">Explore More</p>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter uppercase">Related Products</h2>
              </div>
            </div>
            <Link href="/products" className="text-[#FF6600] font-black uppercase tracking-widest text-[10px] no-underline flex items-center gap-2 hover:gap-3 transition-all shrink-0">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={`/products/${p.slug}`} className="group block no-underline">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-50 mb-4 border border-slate-100 group-hover:shadow-xl group-hover:border-orange-100 transition-all">
                    <img src={getImageUrl(p.image)} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <span className="text-[9px] font-black text-[#FF6600] uppercase tracking-widest block mb-1">{p.category}</span>
                  <h3 className="text-base font-black text-slate-900 group-hover:text-[#FF6600] transition-colors tracking-tight">{p.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════ SECTION 12: FAQ ═══════════════ */}
        <section className="mb-24">
          <SectionHeading label="Common Questions" title="Frequently Asked Questions" />
          <div className="space-y-3 max-w-4xl">
            {content.faq?.map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl border border-slate-100 hover:border-orange-100 transition-colors overflow-hidden">
                <button
                  className="w-full flex items-center justify-between gap-4 px-8 py-6 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-black text-slate-900 text-sm pr-4">{item.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-[#FF6600] shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════ SECTION 13: RELATED BLOGS ═══════════════ */}
        <section className="mb-24">
          <div className="flex items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-4">
              <div className="h-1 w-12 bg-[#FF6600]" />
              <div>
                <p className="text-[10px] font-black text-[#FF6600] uppercase tracking-widest mb-1">Knowledge Hub</p>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter uppercase">Related Technical Guides</h2>
              </div>
            </div>
            <Link href="/blog" className="text-[#FF6600] font-black uppercase tracking-widest text-[10px] no-underline flex items-center gap-2 hover:gap-3 transition-all shrink-0">
              All Blogs <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.relatedBlogs?.map((blog, i) => (
              <Link key={i} href={`/blog/${blog.slug}`} className="group no-underline block">
                <div className="aspect-[16/7] rounded-3xl overflow-hidden mb-4 border border-slate-100 group-hover:shadow-xl transition-all">
                  <img src={blog.img} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="text-[9px] font-black text-[#FF6600] uppercase tracking-widest block mb-2">{blog.cat}</span>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-[#FF6600] transition-colors tracking-tight">
                  <BookOpen size={14} className="inline mr-2 opacity-40" />
                  {blog.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>


        {/* ═══════════════ SECTION 15: SEO CONTENT BLOCK ═══════════════ */}
        <section className="mb-24 bg-slate-50 rounded-3xl p-10 border border-slate-100">
          <h2 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-wide">
            About {product.title} — Europack India
          </h2>
          <div className="text-sm text-slate-500 leading-relaxed space-y-3">
            {content.seoContent.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* ═══════════════ SECTION 16: FINAL CTA ═══════════════ */}
        <section className="bg-[#1A1F2C] rounded-[48px] p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5 tracking-tighter leading-none">
              Ready to Order <span className="text-[#FF6600]">{product.title}?</span>
            </h2>
            <p className="text-slate-400 font-semibold text-lg mb-10 max-w-xl mx-auto">
              Contact our engineering team for a customized quote tailored to your cargo specifications and export destination. We respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => setIsQuoteOpen(true)} className="px-10 py-5 bg-[#FF6600] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#CC5200] transition-all shadow-2xl shadow-orange-900/20">
                Request Custom Quote
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-[#25D366] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#1DA851] transition-all no-underline"
              >
                WhatsApp Now
              </a>
              <Link href="/products" className="px-10 py-5 bg-white/5 backdrop-blur border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all no-underline">
                Browse All Products
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* ── ENQUIRY MODAL ── */}
      <EnquiryModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        serviceName={product.title}
      />
    </div>
  );
}

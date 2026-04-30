'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronRight, ArrowRight, CheckCircle2, Shield, Zap, Globe,
  Phone, MessageSquare, Star, Award, Wrench, Check, X,
  ChevronDown, Package, Factory, Truck, Warehouse, HeartPulse,
  FlaskConical, HardHat, Settings
} from 'lucide-react';
import type { Category, SubCategory } from '../../../../constants/productsData';
import type { GeneratedProductContent } from '../../../../lib/productContentGenerator';
import { useModal } from '../../../../context/ModalContext';

// ──────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────
const iconMap: Record<string, any> = {
  Factory, Truck, Warehouse, HeartPulse, FlaskConical, HardHat,
  Package, Globe, Shield, Wrench, Zap, Settings,
  Award, Star, Phone, MessageSquare,
};

function DynIcon({ name, size = 24 }: { name: string; size?: number }) {
  const Icon = iconMap[name] || Package;
  return <Icon size={size} />;
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className="h-1 w-12 bg-[#FF6600] shrink-0" />
      <div>
        <p className="text-[10px] font-black text-[#FF6600] uppercase tracking-widest mb-1">{label}</p>
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter">{title}</h2>
      </div>
    </div>
  );
}

function getImageUrl(path: string) {
  if (!path) return '/images/banners/banner_main.png';
  if (path.startsWith('http') || path.startsWith('/')) return path;
  return `http://localhost:5002/${path}`;
}

// ──────────────────────────────────────────────
// PROPS
// ──────────────────────────────────────────────
interface Props {
  product: { id: string; name: string; subTitle: string; specs: string[]; img: string };
  category: Category;
  subCategory: SubCategory;
  content: GeneratedProductContent;
  relatedProducts: { id: string; name: string; subTitle: string; specs: string[]; img: string }[];
}

// ──────────────────────────────────────────────
// MAIN COMPONENT
// ──────────────────────────────────────────────
export default function ProductSubDetailClient({
  product, category, subCategory, content, relatedProducts
}: Props) {
  const { openEnquiryModal } = useModal();
  const [activeImage, setActiveImage] = useState(getImageUrl(product.img));
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const whatsappMsg = encodeURIComponent(`Hi Europack, I need a quote for ${product.name}. Please send me pricing and specifications.`);
  const whatsappUrl = `https://wa.me/919820090775?text=${whatsappMsg}`;

  const allImages = [getImageUrl(product.img), ...content.images.slice(1, 5)]
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 5);

  return (
    <div className="bg-white min-h-screen">

      {/* ── MOBILE STICKY CTA ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex border-t border-slate-100 bg-white shadow-2xl">
        <button onClick={openEnquiryModal} className="flex-1 flex items-center justify-center gap-2 bg-[#FF6600] text-white py-4 font-black uppercase tracking-widest text-xs">
          <MessageSquare size={15} /> Get Quote
        </button>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 font-black uppercase tracking-widest text-xs no-underline">
          WhatsApp
        </a>
        <a href="tel:+919820090775" className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-4 font-black uppercase tracking-widest text-xs no-underline">
          <Phone size={15} /> Call
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 md:pb-12">

        {/* ══════════════════════════════════════
            SECTION 1: BREADCRUMB
        ══════════════════════════════════════ */}
        <nav className="flex flex-wrap items-center gap-1.5 text-[10px] font-black text-slate-400 mb-10 tracking-widest uppercase" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#FF6600] transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href="/products" className="hover:text-[#FF6600] transition-colors">Products</Link>
          <ChevronRight size={10} />
          <Link href={`/products#${category.id}`} className="hover:text-[#FF6600] transition-colors">{category.title}</Link>
          <ChevronRight size={10} />
          <span className="text-slate-500">{subCategory.title}</span>
          <ChevronRight size={10} />
          <span className="text-[#FF6600]">{product.name}</span>
        </nav>

        {/* ══════════════════════════════════════
            SECTION 2 & 3: HERO (2-col layout)
        ══════════════════════════════════════ */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">

          {/* LEFT: Content */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:sticky lg:top-28 space-y-6">
            {/* Category badge */}
            <div className="inline-flex items-center gap-2 bg-orange-50 text-[#FF6600] text-[10px] font-black uppercase tracking-[0.25em] px-4 py-2 rounded-full">
              <Package size={12} /> {category.title} — {subCategory.title}
            </div>

            {/* H1 */}
            <div>
              <h1 className="text-3xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tighter">
                {product.name}
                <span className="block text-[#FF6600] text-lg font-black mt-1 uppercase tracking-widest">{product.subTitle}</span>
              </h1>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">Manufacturer in Mumbai, India — Europack Industries</p>
            </div>

            {/* Intro paragraph (first 2 lines) */}
            <p className="text-sm text-slate-600 leading-relaxed">
              {content.intro.split('\n\n')[0]}
            </p>

            {/* Key Features bullets */}
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Key Highlights</p>
              {content.keyFeatures.slice(0, 8).map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={15} className="text-[#FF6600] shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-slate-700">{f}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={openEnquiryModal}
                className="flex-1 flex items-center justify-center gap-2 bg-[#FF6600] text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#CC5200] transition-all shadow-lg shadow-orange-100 group"
              >
                Get Free Quote <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#1DA851] transition-all no-underline">
                WhatsApp Now
              </a>
              <a href="tel:+919820090775"
                className="flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-700 transition-all no-underline">
                <Phone size={14} /> Call
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['ISPM-15 Certified', 'ISO 9001:2015', '33+ Years', 'Pan-India Delivery', '1000+ Clients'].map((b, i) => (
                <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-500">
                  {b}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Image Gallery */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            {/* Main image */}
            <div className="aspect-[4/3] rounded-[32px] overflow-hidden bg-slate-50 border border-slate-100 relative group">
              <img src={activeImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute top-5 left-5 bg-[#FF6600] text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest">
                {category.title}
              </div>
              <div className="absolute top-5 right-5 bg-white/90 text-slate-700 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest">
                ISO 9001:2015
              </div>
            </div>


            {/* Tagline card */}
            <div className="bg-[#1A1F2C] rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent" />
              <div className="relative flex items-start gap-4">
                <Award className="text-[#FF6600] shrink-0 mt-0.5" size={22} />
                <div>
                  <p className="font-black text-base tracking-tight">{product.subTitle} — Engineering Grade Quality</p>
                  <p className="text-slate-400 text-xs mt-1">33+ years of industrial packaging excellence. Trusted by 1,000+ clients.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════
            SECTION 4: INTRO PARAGRAPH (Full)
        ══════════════════════════════════════ */}
        <section className="mb-16">
          <SectionHeading label="Product Introduction" title={`About ${product.name}`} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-slate-50 rounded-3xl p-8 lg:p-10 border border-slate-100 space-y-4">
              {content.intro.split('\n\n').map((para, i) => (
                <p key={i} className="text-sm text-slate-600 leading-relaxed">{para}</p>
              ))}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 content-start">
              {[
                { num: '33+', label: 'Years Experience' },
                { num: '1000+', label: 'Happy Clients' },
                { num: '100%', label: 'Quality Assured' },
                { num: 'PAN', label: 'India' },
              ].map((s, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-3xl font-black text-[#FF6600]">{s.num}</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* ══════════════════════════════════════
            SECTION 7: SHORT DESCRIPTION / OVERVIEW
        ══════════════════════════════════════ */}
        <section className="mb-16">
          <SectionHeading label="Product Summary" title="Short Description" />
          <div className="bg-orange-50 border border-orange-100 rounded-3xl p-8 lg:p-10">
            {content.overview.split('\n\n').map((para, i) => (
              <p key={i} className="text-sm text-slate-700 leading-relaxed mb-3 last:mb-0">{para}</p>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            SECTION 8: KEY FEATURES
        ══════════════════════════════════════ */}
        <section className="mb-16">
          <SectionHeading label="Why This Product" title="Key Features" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.keyFeatures.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-3 bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all group"
              >
                <CheckCircle2 size={16} className="text-[#FF6600] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-slate-700">{f}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            SECTION 9: BENEFITS
        ══════════════════════════════════════ */}
        <section className="mb-16 bg-[#1A1F2C] rounded-[40px] p-10 lg:p-14">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-1 w-12 bg-[#FF6600]" />
            <div>
              <p className="text-[10px] font-black text-[#FF6600] uppercase tracking-widest mb-1">Core Advantages</p>
              <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tighter">Benefits of {product.name}</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Certified Compliance', desc: `Every unit is ${content.specs[6]?.value || 'compliance certified'} — ensuring zero customs delays at all international checkpoints.`, icon: Shield },
              { title: 'Engineering Precision', desc: 'Manufactured to exact dimensional tolerances with structural load testing on every production batch.', icon: Settings },
              { title: 'Rapid Lead Times', desc: 'Standard configurations ready in 3–5 days. Custom designs in 7–12 days. Emergency orders accommodated.', icon: Zap },
              { title: 'Turnkey Supply', desc: 'From design consultation to factory-gate or port delivery — one supplier, zero coordination overhead.', icon: Globe },
            ].map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-[#FF6600] mb-4 group-hover:bg-[#FF6600] group-hover:text-white transition-all">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-base font-black text-white mb-2">{b.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════
            SECTION 10: APPLICATIONS
        ══════════════════════════════════════ */}
        <section className="mb-16">
          <SectionHeading label="Industry Use Cases" title="Applications & Use Cases" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {content.applications.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-xl hover:border-orange-100 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#FF6600] mb-4 group-hover:bg-[#FF6600] group-hover:text-white transition-all">
                  <DynIcon name={app.icon} size={22} />
                </div>
                <h3 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-wide">{app.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{app.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            SECTION 11: DETAILED TECHNICAL SPECS
        ══════════════════════════════════════ */}
        <section className="mb-16">
          <SectionHeading label="Technical Data" title="Detailed Technical Specifications" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="text-left px-6 py-3.5 text-[10px] font-black uppercase tracking-widest" colSpan={2}>Technical Parameters</th>
                  </tr>
                </thead>
                <tbody>
                  {content.technicalDetails.map((d, i) => (
                    <tr key={i} className={`border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-[#FF6600] w-1/2">{d.key}</td>
                      <td className="px-5 py-3 text-xs font-bold text-slate-700">{d.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-7">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">Product Specifications at a Glance</h3>
                <div className="space-y-3">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#FF6600] shrink-0" />
                      <span className="text-sm font-semibold text-slate-700">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#FF6600] rounded-2xl p-7 text-white">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Need a Custom Spec Sheet?</p>
                <p className="text-base font-black mb-4">Get a detailed engineering datasheet tailored to your application</p>
                <button onClick={openEnquiryModal} className="bg-white text-[#FF6600] px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-50 transition-colors">
                  Request Datasheet
                </button>
              </div>
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════
            SECTION 13: QUALITY STANDARDS
        ══════════════════════════════════════ */}
        <section className="mb-16">
          <SectionHeading label="Compliance" title="Quality Standards & Certifications" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {content.qualityStandards.map((qs, i) => (
              <div key={i} className="flex gap-5 bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md hover:border-orange-100 transition-all">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                  <Check size={20} strokeWidth={3} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 mb-1 uppercase tracking-wide">{qs.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{qs.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            SECTION 14: CUSTOMIZATION OPTIONS
        ══════════════════════════════════════ */}
        <section className="mb-16">
          <SectionHeading label="Tailored to You" title="Customization Options" />
          <div className="bg-slate-900 rounded-[32px] p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent" />
            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.customizationOptions.map((opt, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FF6600]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-[#FF6600]" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-slate-300 leading-relaxed">{opt}</span>
                </div>
              ))}
            </div>
            <div className="relative mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
              <button onClick={openEnquiryModal} className="px-8 py-4 bg-[#FF6600] text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#CC5200] transition-all">
                Request Custom Configuration
              </button>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 bg-[#25D366] text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#1DA851] transition-all no-underline text-center">
                WhatsApp Specs
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SECTION 15: INDUSTRY APPLICATIONS
        ══════════════════════════════════════ */}
        <section className="mb-16">
          <SectionHeading label="Sectors We Serve" title="Industry Applications" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: 'Factory', label: 'Heavy Engineering' },
              { icon: 'Truck', label: 'Automotive' },
              { icon: 'HeartPulse', label: 'Pharma' },
              { icon: 'FlaskConical', label: 'Chemical' },
              { icon: 'HardHat', label: 'Defense' },
              { icon: 'Package', label: 'FMCG' },
            ].map((ind, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center hover:shadow-md hover:border-orange-100 transition-all group">
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-[#FF6600] mx-auto mb-3 shadow-sm group-hover:bg-[#FF6600] group-hover:text-white transition-all">
                  <DynIcon name={ind.icon} size={20} />
                </div>
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-wide">{ind.label}</p>
              </div>
            ))}
          </div>
        </section>


        {/* ══════════════════════════════════════
            SECTION 17: PACKAGING & LOGISTICS
        ══════════════════════════════════════ */}
        <section className="mb-16">
          <SectionHeading label="Logistics & Supply" title="Packaging & Delivery Information" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {content.deliveryInfo.map((d, i) => {
              const icons = [Package, Truck, Globe];
              const Icon = icons[i % 3];
              return (
                <div key={i} className="bg-[#1A1F2C] rounded-2xl p-7 text-white group hover:bg-[#FF6600] transition-colors duration-500">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#FF6600] group-hover:text-white mb-5 transition-colors">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-wide mb-2">{d.title}</h3>
                  <p className="text-xs text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">{d.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════
            SECTION 18: WHY CHOOSE EUROPACK
        ══════════════════════════════════════ */}
        <section className="mb-16 bg-slate-50 rounded-[40px] p-10 lg:p-14 border border-slate-100">
          <SectionHeading label="Our Edge" title="Why Choose Europack" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {content.whyEuropack.map((w, i) => {
              const icons = [Award, Shield, Wrench, Zap];
              const Icon = icons[i % 4];
              return (
                <div key={i} className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#FF6600] mb-4 group-hover:bg-[#FF6600] group-hover:text-white transition-all">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-wide">{w.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </section>


        {/* ══════════════════════════════════════
            SECTION 20: LONG SEO CONTENT
        ══════════════════════════════════════ */}
        <section className="mb-16">
          <SectionHeading label="About This Product" title={`${product.name} — Europack India`} />
          <div className="bg-slate-50 rounded-3xl p-8 lg:p-12 border border-slate-100">
            <div className="space-y-4 max-w-4xl">
              {content.seoContent.split('\n\n').map((para, i) => (
                <p key={i} className="text-sm text-slate-600 leading-relaxed">{para}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SECTION 21: FAQ
        ══════════════════════════════════════ */}
        <section className="mb-16">
          <SectionHeading label="Common Questions" title="Frequently Asked Questions" />
          <div className="space-y-3 max-w-4xl">
            {content.faq.map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl border border-slate-100 hover:border-orange-100 transition-colors overflow-hidden">
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="font-black text-slate-900 text-sm pr-4">{item.q}</span>
                  <ChevronDown size={15} className={`text-[#FF6600] shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div
                    className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4"
                  >
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            SECTION 22: RELATED PRODUCTS
        ══════════════════════════════════════ */}
        {relatedProducts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between gap-4 mb-10">
              <SectionHeading label="Explore More" title="Related Products" />
              <Link href={`/products#${category.id}`} className="text-[#FF6600] font-black uppercase tracking-widest text-[10px] no-underline flex items-center gap-2 hover:gap-3 transition-all shrink-0">
                View All <ArrowRight size={13} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link href={`/products/${category.id}/${p.id}`} className="group block no-underline bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-orange-100 transition-all">
                    <div className="aspect-[16/9] bg-slate-50 relative overflow-hidden">
                      <img src={getImageUrl(p.img)} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <span className="text-[9px] font-black text-[#FF6600] uppercase tracking-widest block mb-1">{p.subTitle}</span>
                      <h3 className="text-sm font-black text-slate-900 group-hover:text-[#FF6600] transition-colors tracking-tight">{p.name}</h3>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {p.specs.slice(0, 2).map((s, j) => (
                          <span key={j} className="px-2 py-1 bg-slate-50 text-[9px] font-bold text-slate-500 rounded-lg border border-slate-100">{s}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════
            SECTION 23: STRONG CTA
        ══════════════════════════════════════ */}
        <section className="bg-[#1A1F2C] rounded-[40px] p-10 lg:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent" />
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#FF6600_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-[#FF6600]/20 text-[#FF6600] text-[9px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600] animate-pulse" /> Get a Response Within 24 Hours
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter leading-tight">
              Ready to Order <span className="text-[#FF6600]">{product.name}?</span>
            </h2>
            <p className="text-slate-400 font-medium text-base mb-10 max-w-xl mx-auto">
              Talk to our engineering team for a customized quote, technical datasheet, and delivery timeline tailored to your exact requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={openEnquiryModal}
                className="w-full sm:w-auto px-10 py-5 bg-[#FF6600] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#CC5200] transition-all shadow-2xl shadow-orange-900/20">
                Request Custom Quote
              </button>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-5 bg-[#25D366] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#1DA851] transition-all no-underline text-center">
                WhatsApp Now
              </a>
              <Link href="/products"
                className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all no-underline text-center">
                Browse All Products
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

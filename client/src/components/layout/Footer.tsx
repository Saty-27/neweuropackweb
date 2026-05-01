import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  Loader2,
  Instagram,
  Linkedin,
  Youtube,
  MessageSquare,
  Plus,
  Minus,
  ExternalLink,
  ShieldCheck,
  Award,
  CircleDot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const [data, setData] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [footerRes, productsRes] = await Promise.all([
          fetch('http://localhost:5002/api/footer'),
          fetch('http://localhost:5002/api/products')
        ]);
        
        const footerJson = await footerRes.json();
        const productsJson = await productsRes.json();

        if (footerJson.success) setData(footerJson.data);
        if (productsJson.success) setProducts(productsJson.data);
      } catch (err) {
        console.error('Footer fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading || !data) return (
    <div className="py-20 bg-[#0B0F19] flex items-center justify-center">
       <Loader2 className="animate-spin text-[#FF6600]" size={40} />
    </div>
  );

  const groupedProducts = {
    'Pallet Solutions': products.filter(p => p.category === 'Pallet Solutions'),
    'Packaging Solutions': products.filter(p => p.category === 'Packaging Solutions'),
    'Industrial Services': products.filter(p => p.category === 'Industrial Services')
  };

  const socialIcons: Record<string, any> = {
    Instagram: <Instagram size={18} />,
    LinkedIn: <Linkedin size={18} />,
    YouTube: <Youtube size={18} />,
    WhatsApp: <MessageSquare size={18} />
  };

  const ColumnHeader = ({ title, id }: { title: string, id: string }) => (
    <div 
      className="flex items-center justify-between mb-6 md:mb-8"
    >
      <h4 className="text-white font-black text-[11px] sm:text-xs uppercase tracking-[0.2em] border-l-4 border-[#FF6600] pl-4">
        {title}
      </h4>
    </div>
  );

  return (
    <footer className="bg-[#0B0F19] pt-24 pb-12 relative overflow-hidden">
      {/* Cinematic Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#FF6600]/5 rounded-full blur-[120px] -ml-64 -mt-64" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ROW 1: PRIMARY Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/5">
          
          {/* Col 1: Brand + About */}
          <div className="space-y-8">
            <Link href="/" className="inline-block transform hover:scale-105 transition-transform duration-500">
              <span className="text-2xl font-black text-white tracking-tighter">
                EURO<span className="text-[#FF6600]">PACK</span>
              </span>
              <p className="text-[10px] font-black text-[#FF6600] tracking-[0.4em] uppercase mt-1">Technical Packing</p>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {data.description || "India's trusted leader in industrial packaging since 1993. Specialists in ISPM-15 certified wooden crates and B2B export solutions."}
            </p>

            <div className="flex flex-wrap gap-4">
               {[
                 { label: data.trustIndicators?.experienceYears || '33+', sub: 'Years Experience', icon: <Award size={14}/> },
                 { label: data.trustIndicators?.clientCount || '1000+', sub: 'Clients', icon: <ShieldCheck size={14}/> }
               ].map((trust, idx) => (
                 <div key={idx} className="flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-2 rounded-xl">
                   <div className="text-[#FF6600]">{trust.icon}</div>
                   <div>
                     <p className="text-white font-black text-[11px] leading-tight">{trust.label}</p>
                     <p className="text-slate-500 text-[8px] font-bold uppercase tracking-wider">{trust.sub}</p>
                   </div>
                 </div>
               ))}
            </div>

            <div className="flex gap-3">
              {data.socialLinks?.map((social: any, idx: number) => (
                <a 
                  key={idx} 
                  href={social.link} 
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-[#FF6600] hover:text-white hover:border-[#FF6600] hover:-translate-y-1 transition-all duration-500 shadow-lg hover:shadow-orange-500/20"
                >
                  {socialIcons[social.name] || <ExternalLink size={18} />}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <ColumnHeader title="Quick Links" id="quick-links" />
            <ul className="space-y-4">
              {data.quickLinks?.map((link: any, idx: number) => (
                <li key={idx}>
                  <Link 
                    href={link.link} 
                    className="group flex items-center gap-3 text-slate-400 hover:text-white text-sm font-medium transition-all"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF6600] opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                    <span className="relative overflow-hidden">
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FF6600] -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Products (Auto-Sync) */}
          <div className="lg:col-span-1">
            <ColumnHeader title="Our Products" id="products" />
            <div className="space-y-6">
              {Object.entries(groupedProducts).map(([cat, items]) => (
                items.length > 0 && (
                  <div key={cat} className="space-y-3">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{cat}</p>
                    <ul className="space-y-2">
                       {items.slice(0, 3).map((p: any) => (
                         <li key={p._id}>
                           <Link href={`/p/${p.slug}`} className="text-slate-400 hover:text-[#FF6600] text-sm font-medium transition-all block">
                             {p.title}
                           </Link>
                         </li>
                       ))}
                    </ul>
                  </div>
                )
              ))}
              <Link href="/products" className="inline-flex items-center gap-2 text-[#FF6600] font-black uppercase text-[10px] tracking-widest hover:gap-4 transition-all pt-2">
                View All Solutions <ArrowRight size={12}/>
              </Link>
            </div>
          </div>

          {/* Col 4: Services & Industries */}
          <div>
            <ColumnHeader title="Capabilities" id="capabilities" />
            <div className="grid grid-cols-1 gap-8">
               <div className="space-y-4">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Core Services</p>
                 <div className="flex flex-wrap gap-2">
                   {['Export Packing', 'Vacuum Packing', 'Lashing', 'Container Stuffing'].map(s => (
                     <span key={s} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-slate-400">{s}</span>
                   ))}
                 </div>
               </div>
               <div className="space-y-4 mt-6">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Focus Industries</p>
                 <div className="flex flex-wrap gap-2">
                   {['Engineering', 'Automotive', 'Pharma', 'Logistics'].map(i => (
                     <span key={i} className="px-3 py-1 bg-[#FF6600]/10 border border-[#FF6600]/10 rounded-lg text-[10px] font-bold text-[#FF6600]">{i}</span>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* ROW 2: Deep Trust + CONTACT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 lg:gap-8 pt-16">
          
          {/* Col 5: Head Office */}
          <div>
            <ColumnHeader title="Head Office" id="head-office" />
            <div className="space-y-6">
               <div className="flex gap-4">
                 <MapPin size={20} className="text-[#FF6600] shrink-0" />
                 <p className="text-slate-400 text-sm leading-relaxed">
                   {data.contact?.headOffice?.address}
                 </p>
               </div>
               <div className="space-y-3">
                 {data.contact?.headOffice?.phones?.map((p: any, i: number) => (
                   <a key={i} href={`tel:${p.number}`} className="flex items-center gap-4 text-slate-400 hover:text-white transition-all group">
                     <Phone size={16} className="text-[#FF6600] group-hover:scale-110 transition-transform" />
                     <div className="text-sm font-medium">
                       <p>{p.number}</p>
                       <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{p.label}</p>
                     </div>
                   </a>
                 ))}
               </div>
            </div>
          </div>



          {/* Col 8: Trust + CTA Micro Block */}
          <div>
            <ColumnHeader title="Consultation" id="trust-cta" />
            <div className="space-y-6">
               <div className="bg-gradient-to-br from-white/10 to-transparent p-6 rounded-[32px] border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF6600]/10 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-700" />
                  <div className="relative z-10">
                    <p className="text-white font-black text-sm mb-2">Zero-Damage Assurance</p>
                    <p className="text-slate-400 text-[11px] leading-relaxed mb-6">Join 1000+ manufacturing leaders who trust Europack for global transit security.</p>
                    <Link href="/contact" className="w-fit px-8 py-3 bg-[#FF6600] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 hover:bg-[#e65c00] transition-colors">
                      Get a Quote <ArrowRight size={12} />
                    </Link>
                  </div>
               </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
           <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
             {data.bottom?.copyright || `© ${new Date().getFullYear()} Europack . All rights reserved.`}
           </p>
           <div className="flex flex-wrap items-center justify-center gap-8">
              {data.bottom?.links?.map((link: any, idx: number) => (
                <Link key={idx} href={link.link} className="text-slate-600 hover:text-[#FF6600] text-[10px] font-black uppercase tracking-widest transition-colors">
                  {link.name}
                </Link>
              ))}
           </div>
        </div>

      </div>
    </footer>
  );
}

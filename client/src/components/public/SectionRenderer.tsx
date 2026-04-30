'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Shield, Zap, Globe, Clock, Download } from 'lucide-react';

const Icons: Record<string, any> = {
  Shield, Zap, Globe, Clock, CheckCircle2, ArrowRight, Download
};

interface SectionRendererProps {
  section: any;
  getImageUrl: (path: string) => string;
}

export default function SectionRenderer({ section, getImageUrl }: SectionRendererProps) {
  if (!section.visible || section.visibleOn?.user === false) return null;

  const style = section.style || {};
  const typography = style.typography || {};
  
  const sectionContent = () => {
    switch (section.type) {
      case 'features_icons':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(section.content || []).map((item: any, i: number) => {
              const Icon = Icons[item.icon] || CheckCircle2;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#FF6600] mb-6">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 mb-3">{item.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{item.description || 'Quality assured performance for your industrial needs.'}</p>
                </motion.div>
              );
            })}
          </div>
        );

      case 'text_block':
        return (
          <div className="max-w-4xl mx-auto">
             {section.content?.heading && (
                <section.seo.headingLevel className="text-3xl lg:text-5xl font-black mb-8 leading-tight" style={{ 
                  fontSize: typography.heading?.fontSize, 
                  fontWeight: typography.heading?.fontWeight,
                  fontFamily: typography.heading?.fontFamily 
                }}>
                   {section.content.heading}
                </section.seo.headingLevel>
             )}
             <div 
               className="text-lg lg:text-xl font-medium leading-relaxed opacity-90 prose prose-slate max-w-none"
               style={{ 
                 fontSize: typography.text?.fontSize, 
                 lineHeight: typography.text?.lineHeight,
                 color: style.textColor 
               }}
               dangerouslySetInnerHTML={{ __html: section.content?.text || '' }} 
             />
          </div>
        );

      case 'cta':
        return (
          <div className="text-center py-12">
             <Link 
               href={section.content?.link || '#'} 
               className="inline-flex items-center gap-4 bg-[#FF6600] text-white px-10 py-6 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl shadow-orange-200"
             >
                {section.content?.text || 'Explore More'} <ArrowRight size={24} />
             </Link>
          </div>
        );

      case 'testimonial':
        return (
           <div className="max-w-3xl mx-auto text-center">
              <div className="text-5xl text-orange-200 font-serif mb-6">"</div>
              <p className="text-2xl lg:text-3xl font-bold text-slate-800 italic mb-8 leading-relaxed">
                 {section.content?.quote}
              </p>
              <div className="font-black text-[#FF6600] tracking-widest uppercase text-sm">
                 — {section.content?.author}
              </div>
           </div>
        );

      default:
        return null;
    }
  };

  return (
    <section 
      style={{ 
        padding: style.padding || '100px 0', 
        backgroundColor: style.backgroundColor || 'transparent',
        color: style.textColor || '#1e293b'
      }}
      className={`w-full overflow-hidden ${section.layout === 'full-width' ? '' : 'px-6'}`}
    >
      <div className={`${section.layout === 'contained' ? 'max-w-7xl mx-auto' : 'container mx-auto'}`}>
        {sectionContent()}
      </div>
    </section>
  );
}

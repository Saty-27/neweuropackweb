'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Link2 as Linkedin, User, ChevronRight, ChevronLeft } from 'lucide-react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface TeamSectionProps {
  // Optional props if needed
}

export default function TeamSection() {
  const [members, setMembers] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTeamData = async () => {
      try {
        const [membersRes, settingsRes] = await Promise.all([
          fetch('http://localhost:5002/api/team').then(res => res.json()),
          fetch('http://localhost:5002/api/team/settings').then(res => res.json())
        ]);
        if (membersRes.success) setMembers(membersRes.data);
        if (settingsRes.success) setSettings(settingsRes.data);
      } catch (error) {
        console.error('Failed to load team section', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTeamData();
  }, []);

  if (isLoading || members.length === 0 || settings?.visible === false) return null;

  const getImageUrl = (path: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5002/${path}`;
  };

  // Slick Carousel Settings
  const carouselSettings = {
    dots: true,
    infinite: members.length > 3,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "cubic-bezier(0.87, 0, 0.13, 1)",
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  // Structured Data (JSON-LD)
  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Organization",
    "name": "Europack",
    "employee": members.map(m => ({
      "@type": "Person",
      "name": m.name,
      "jobTitle": m.designation,
      "description": m.description,
      "image": getImageUrl(m.image.url),
      "sameAs": m.contact?.linkedin ? [m.contact.linkedin] : []
    }))
  };

  const renderMemberCard = (member: any, index: number) => {
    const cardStyle = {
      name: { 
        fontSize: member.style?.name?.fontSize || settings?.globalTypography?.memberName?.fontSize || '20px',
        fontWeight: member.style?.name?.fontWeight || settings?.globalTypography?.memberName?.fontWeight || '700',
        color: member.style?.name?.color || settings?.globalTypography?.memberName?.color || '#1e293b'
      },
      designation: {
        fontSize: member.style?.designation?.fontSize || settings?.globalTypography?.designation?.fontSize || '14px',
        fontWeight: member.style?.designation?.fontWeight || settings?.globalTypography?.designation?.fontWeight || '600',
        color: member.style?.designation?.color || settings?.globalTypography?.designation?.color || '#FF6600'
      },
      description: {
        fontSize: member.style?.description?.fontSize || settings?.globalTypography?.description?.fontSize || '14px',
        lineHeight: member.style?.description?.lineHeight || settings?.globalTypography?.description?.lineHeight || '1.7',
        color: member.style?.description?.color || settings?.globalTypography?.description?.color || '#64748b'
      }
    };

    return (
      <motion.div 
        key={member._id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        className="px-4 h-full py-8"
      >
        <div className="group relative bg-white rounded-[48px] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-700 flex flex-col h-full">
           {/* Image Container */}
           <div className="aspect-[4/5] relative overflow-hidden m-4 rounded-[36px] bg-slate-50">
              <img 
                src={getImageUrl(member.image.url)} 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
                alt={member.image.alt || member.name} 
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4">
                 <div className="flex gap-3 translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-100">
                    {member.contact?.email && (
                       <a href={`mailto:${member.contact.email}`} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 hover:bg-[#FF6600] hover:text-white transition-all shadow-xl">
                          <Mail size={20} />
                       </a>
                    )}
                    {member.contact?.linkedin && (
                       <a href={member.contact.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 hover:bg-[#0077b5] hover:text-white transition-all shadow-xl">
                          <Linkedin size={20} />
                       </a>
                    )}
                 </div>
              </div>

              {/* Tag Component */}
              {member.shortTag && (
                <div className="absolute top-6 left-6">
                   <div className="px-4 py-2 bg-white/90 backdrop-blur shadow-xl rounded-2xl text-[10px] font-black text-[#FF6600] uppercase tracking-widest">
                      {member.shortTag}
                   </div>
                </div>
              )}
           </div>

           {/* Content Component */}
           <div className="px-8 pb-10 flex-1 flex flex-col text-center">
              <h3 style={cardStyle.name} className="mb-1 leading-tight tracking-tight">
                 {member.name}
              </h3>
              <p style={cardStyle.designation} className="mb-5 uppercase tracking-widest">
                 {member.designation}
              </p>
              <p style={cardStyle.description} className="flex-1 italic">
                 {member.description || "Committed to delivering industrial excellence at Europack."}
              </p>
              
              <div className="mt-8 pt-8 border-t border-slate-50 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-700">
                 <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Expert Profile <ChevronRight size={14} className="text-[#FF6600]" />
                 </div>
              </div>
           </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-slate-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
              <h2 
                style={{ 
                   fontSize: settings.globalTypography?.title?.fontSize || '3.5rem', 
                   fontWeight: settings.globalTypography?.title?.fontWeight || '900',
                   color: settings.globalTypography?.title?.color || '#0f172a'
                }}
                className="tracking-tighter mb-4"
              >
                {settings.title}
              </h2>
              <div className="w-24 h-1.5 bg-[#FF6600] mx-auto rounded-full mb-6" />
              <p 
                style={{ 
                   fontSize: settings.globalTypography?.subtitle?.fontSize || '1.125rem',
                   color: settings.globalTypography?.subtitle?.color || '#64748b'
                }}
                className="font-bold uppercase tracking-widest"
              >
                {settings.subtitle}
              </p>
           </motion.div>
        </div>

        {/* Members Deck Rendering */}
        <div className={settings.layout === 'carousel' ? 'carousel-container' : ''}>
           {settings.layout === 'carousel' ? (
              <div className="team-carousel-wrapper -mx-4">
                 <Slider {...carouselSettings}>
                    {members.map((member, i) => renderMemberCard(member, i))}
                 </Slider>
              </div>
           ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 {members.map((member, i) => renderMemberCard(member, i))}
              </div>
           )}
        </div>
      </div>

      <style jsx global>{`
        .team-carousel-wrapper .slick-dots {
          bottom: -40px;
        }
        .team-carousel-wrapper .slick-dots li button:before {
          color: #FF6600;
          font-size: 10px;
          opacity: 0.2;
        }
        .team-carousel-wrapper .slick-dots li.slick-active button:before {
          opacity: 1;
          color: #FF6600;
        }
      `}</style>
    </section>
  );
}

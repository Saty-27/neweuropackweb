'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, MessageSquare, Building, User, Target, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

interface ContactSectionProps {
  data: any;
}

const IconMap: any = {
  MapPin: MapPin,
  Phone: Phone,
  Mail: Mail,
  Building: Building
};

export default function ContactSection({ data }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  if (!data?.isActive) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5002/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success('Message sent successfully!');
        const whatsappMsg = `Hi Europack! I'm ${formData.name}. I'm interested in: ${formData.subject}. My message: ${formData.message}`;
        window.open(`https://wa.me/919819030303?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
        setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
      } else {
        toast.error('Failed to send message.');
      }
    } catch (error) {
      toast.error('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="contact"
      className="py-24"
      style={{ 
        backgroundColor: data.backgroundColor || '#ffffff',
        backgroundImage: data.backgroundGradient || 'none'
      }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header - Left Aligned as per image */}
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            style={{ 
              fontSize: data.fontSize || '3.5rem',
              fontFamily: data.fontFamily || 'inherit',
              lineHeight: '1.1',
              fontWeight: 900
            }}
          >
            <span style={{ color: data.titleColor1 || '#000000' }}>{data.titlePart1} </span>
            <span style={{ color: data.titleColor2 || '#ff6600' }}>{data.titlePart2}</span>
          </motion.h2>
        </div>

        {/* Map Container - Full Width Boxed */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white h-[450px] relative"
          >
            {data.mapUrl ? (
              <iframe 
                src={data.mapUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">Map Preview</div>
            )}
          </motion.div>
        </div>

        {/* Dynamic Info Cards Grid */}
        {(data.infoCards && data.infoCards.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {data.infoCards.map((card: any, idx: number) => {
              const Icon = IconMap[card.icon] || MapPin;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-gray-50 flex flex-col gap-4 text-center items-center"
                >
                  <div className="bg-orange-600/10 p-4 rounded-2xl text-orange-600">
                    <Icon size={28} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">{card.header}</h4>
                    <p className="text-sm font-bold text-gray-800 whitespace-pre-line">{card.details}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Form Container - Blue Border Box as per image */}
        {data.showForm && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3rem] p-8 md:p-14 border-[3px] border-blue-400/90 shadow-2xl shadow-blue-500/5 max-w-5xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-600/30">
                <Mail size={24} />
              </div>
              <h3 className="text-2xl font-black text-gray-900">Send Us a Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-600 uppercase flex items-center gap-2 mb-1">Your Name *</label>
                  <input 
                    required type="text"
                    className="w-full px-7 py-5 bg-gray-50/50 border-2 border-gray-100 rounded-[1.5rem] focus:border-blue-500/50 focus:bg-white outline-none transition-all font-bold text-sm text-gray-600 placeholder:text-gray-300 shadow-inner"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-600 uppercase flex items-center gap-2 mb-1">Email Address *</label>
                  <input 
                    required type="email"
                    className="w-full px-7 py-5 bg-gray-50/50 border-2 border-gray-100 rounded-[1.5rem] focus:border-blue-500/50 focus:bg-white outline-none transition-all font-bold text-sm text-gray-600 placeholder:text-gray-300 shadow-inner"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-600 uppercase flex items-center gap-2 mb-1">Phone Number</label>
                  <input 
                    type="text"
                    className="w-full px-7 py-5 bg-gray-50/50 border-2 border-gray-100 rounded-[1.5rem] focus:border-blue-500/50 focus:bg-white outline-none transition-all font-bold text-sm text-gray-600 placeholder:text-gray-300 shadow-inner"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-600 uppercase flex items-center gap-2 mb-1">Company Name</label>
                  <input 
                    type="text"
                    className="w-full px-7 py-5 bg-gray-50/50 border-2 border-gray-100 rounded-[1.5rem] focus:border-blue-500/50 focus:bg-white outline-none transition-all font-bold text-sm text-gray-600 placeholder:text-gray-300 shadow-inner"
                    placeholder="Enter your company name"
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-600 uppercase flex items-center gap-2 mb-1">Subject *</label>
                <input 
                  required type="text"
                  className="w-full px-7 py-5 bg-gray-50/50 border-2 border-gray-100 rounded-[1.5rem] focus:border-blue-500/50 focus:bg-white outline-none transition-all font-bold text-sm text-gray-600 placeholder:text-gray-300 shadow-inner"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-600 uppercase flex items-center gap-2 mb-1">Message *</label>
                <textarea 
                  required rows={5}
                  className="w-full px-7 py-5 bg-gray-50/50 border-2 border-gray-100 rounded-[2rem] focus:border-blue-500/50 focus:bg-white outline-none transition-all font-bold text-sm text-gray-600 placeholder:text-gray-300 resize-none shadow-inner"
                  placeholder="Tell us about your packaging requirements..."
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button 
                disabled={loading}
                className="w-full bg-orange-600 text-white font-black py-6 rounded-[2rem] shadow-2xl shadow-orange-600/40 hover:bg-orange-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm"
              >
                {loading ? 'Processing...' : <><Send size={18} /> Send Message</>}
              </button>
            </form>
          </motion.div>
        )}

        {/* View More Link at bottom */}
        {data.viewMoreLink && (
           <div className="text-center mt-16">
              <Link 
                href={data.viewMoreLink}
                className="text-orange-600 font-black text-xl hover:translate-x-1 transition-all flex items-center justify-center gap-2"
              >
                View More <ChevronRight size={20} />
              </Link>
           </div>
        )}
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Scale, Globe } from 'lucide-react';

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Data We Collect",
      icon: <Eye size={20} />,
      content: "We collect information you provide directly to us, such as when you request a quote, apply for a job, or contact us. This includes your name, email, phone number, and company details."
    },
    {
      title: "How We Use Data",
      icon: <Globe size={20} />,
      content: "Your information is used to provide technical packaging consultations, process orders, and improve our industrial services. We do not sell your data to third parties."
    },
    {
      title: "Security Measures",
      icon: <Lock size={20} />,
      content: "We implement industry-standard encryption and security protocols to protect your sensitive business information from unauthorized access or disclosure."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-[#0B0F19] py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/particles.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#FF6600]/20 text-[#FF6600] text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6"
          >
            <Shield size={12} /> Privacy Commitment
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
            Privacy <span className="text-[#FF6600]">Policy.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            At Europack, we take the security of your industrial data seriously. This policy outlines how we handle and protect your information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">
            <p className="text-sm text-slate-500 mb-12 italic">Last Updated: April 28, 2026</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {sections.map((s, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-orange-100 transition-all">
                  <div className="text-[#FF6600] mb-4">{s.icon}</div>
                  <h3 className="text-base font-black text-slate-900 mb-2 uppercase tracking-wide">{s.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{s.content}</p>
                </div>
              ))}
            </div>

            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-orange-50 text-[#FF6600] flex items-center justify-center text-sm font-black">01</span>
                  Information Collection
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Europack Industries collects information that is necessary for the provision of our industrial packaging services. This includes personal identification information (Name, email address, phone number, etc.) and company-specific data related to logistics and packaging requirements.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-orange-50 text-[#FF6600] flex items-center justify-center text-sm font-black">02</span>
                  Data Retention
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm">
                  We retain your information only as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-orange-50 text-[#FF6600] flex items-center justify-center text-sm font-black">03</span>
                  Cookies & Tracking
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Our website uses cookies to enhance user experience and analyze site traffic. You can choose to disable cookies through your browser settings, though this may affect the functionality of certain sections of our platform.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-orange-50 text-[#FF6600] flex items-center justify-center text-sm font-black">04</span>
                  Contact Information
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm">
                  If you have any questions about this Privacy Policy, please contact our data protection officer at <span className="text-[#FF6600] font-black">legal@europackindia.in</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

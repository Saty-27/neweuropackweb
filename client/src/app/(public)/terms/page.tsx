'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, ShieldAlert, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function TermsOfService() {
  const highlights = [
    {
      title: "Service Agreement",
      icon: <FileText size={20} />,
      content: "By accessing Europack's digital services, you agree to comply with our standards of professional conduct and industrial safety protocols."
    },
    {
      title: "Liability Limits",
      icon: <Scale size={20} />,
      content: "Europack's liability is limited to the value of the packaging services provided, subject to the specific terms outlined in your service contract."
    },
    {
      title: "Intellectual Property",
      icon: <ShieldAlert size={20} />,
      content: "All engineering designs, technical specifications, and content on this platform are the exclusive property of Europack Packaging Solutions Pvt. Ltd."
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
            <Info size={12} /> Compliance & Standards
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
            Terms of <span className="text-[#FF6600]">Service.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            Please review the legal framework governing our industrial partnerships and digital platform usage.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">
            <p className="text-sm text-slate-500 mb-12 italic">Last Updated: April 28, 2026</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {highlights.map((h, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-orange-100 transition-all">
                  <div className="text-[#FF6600] mb-4">{h.icon}</div>
                  <h3 className="text-base font-black text-slate-900 mb-2 uppercase tracking-wide">{h.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{h.content}</p>
                </div>
              ))}
            </div>

            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-orange-50 text-[#FF6600] flex items-center justify-center text-sm font-black">01</span>
                  Acceptance of Terms
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm">
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. Furthermore, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-orange-50 text-[#FF6600] flex items-center justify-center text-sm font-black">02</span>
                  Professional Use Only
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm">
                  This website is intended for use by business professionals and manufacturing entities. Europack reserves the right to terminate access to any user who engages in unauthorized or non-professional conduct.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-orange-50 text-[#FF6600] flex items-center justify-center text-sm font-black">03</span>
                  Quotation Validity
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm">
                  All quotations provided through our digital enquiry system are preliminary estimates. Final pricing is subject to technical site inspection and official purchase orders as per Europack's standard billing cycles.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-orange-50 text-[#FF6600] flex items-center justify-center text-sm font-black">04</span>
                  Governing Law
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm">
                  These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts in Mumbai.
                </p>
              </div>
            </div>

            <div className="mt-20 p-8 bg-slate-900 rounded-[32px] text-white">
              <div className="flex items-start gap-4">
                <AlertCircle className="text-[#FF6600] shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Need Legal Clarification?</h3>
                  <p className="text-slate-400 text-sm mb-6">If your organization requires a customized service level agreement (SLA), please contact our corporate relations team.</p>
                  <a href="mailto:corporate@europackindia.in" className="inline-flex items-center gap-2 text-[#FF6600] font-black uppercase tracking-widest text-[10px] hover:gap-4 transition-all">
                    Contact Legal Team <CheckCircle2 size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { Bot } from 'lucide-react';

interface AISummaryBlockProps {
  summary: string;
}

export default function AISummaryBlock({ summary }: AISummaryBlockProps) {
  if (!summary) return null;

  return (
    <section className="ai-summary bg-[#F8FAFC] border border-slate-200 rounded-[32px] p-8 md:p-10 my-12 relative overflow-hidden group">
      {/* AI Indicator Badge */}
      <div className="absolute top-0 right-0 bg-[#FF6600]/10 text-[#FF6600] px-4 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
        <Bot size={14} /> AI / Search Overview
      </div>
      
      <div className="flex items-start gap-6">
        <div className="hidden md:flex w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 items-center justify-center shrink-0">
          <Bot size={28} className="text-[#1A1F2C]" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-4">
            Quick Summary
          </h2>
          <p className="text-slate-700 font-medium leading-relaxed text-lg">
            {summary}
          </p>
        </div>
      </div>
    </section>
  );
}

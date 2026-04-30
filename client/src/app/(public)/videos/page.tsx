'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, ArrowRight } from 'lucide-react';

const videos = [
  { 
    title: 'Europack Plywood Boxes', 
    duration: '4:32', 
    thumbnail: 'https://img.youtube.com/vi/BDI5S6lmr-Y/maxresdefault.jpg', 
    id: 'BDI5S6lmr-Y', 
    desc: 'High-quality industrial plywood boxes for export packaging and heavy equipment.' 
  },
  { 
    title: 'Europack Wooden Pallets', 
    duration: '3:45', 
    thumbnail: 'https://img.youtube.com/vi/QtF8aynp2PM/maxresdefault.jpg', 
    id: 'QtF8aynp2PM', 
    desc: 'Durable, ISPM-15 compliant wooden pallets designed for global logistics and storage.' 
  },
  { 
    title: 'Pallets Buying Guide', 
    duration: '5:10', 
    thumbnail: 'https://img.youtube.com/vi/1xEEsgImnvA/maxresdefault.jpg', 
    id: '1xEEsgImnvA', 
    desc: 'A comprehensive guide on how to choose the right pallets for your industrial requirements.' 
  },
  { 
    title: 'Europack Introduction Video', 
    duration: '1:20', 
    thumbnail: 'https://img.youtube.com/vi/xGLzD-Rl-j4/maxresdefault.jpg', 
    id: 'xGLzD-Rl-j4', 
    desc: 'Introduction to Europack\'s world-class industrial packaging and logistics solutions.' 
  },
  { 
    title: 'Europack Shuttering Plywood', 
    duration: '2:55', 
    thumbnail: 'https://img.youtube.com/vi/ZVik4Qk0Y6Y/maxresdefault.jpg', 
    id: 'ZVik4Qk0Y6Y', 
    desc: 'Premium grade shuttering plywood for construction and industrial infrastructure.' 
  },
  { 
    title: 'Europack Capsule Bunk Bed', 
    duration: '4:30', 
    thumbnail: 'https://img.youtube.com/vi/2Ah9304AH80/maxresdefault.jpg', 
    id: '2Ah9304AH80', 
    desc: 'Innovative capsule bunk bed solutions for worker accommodation and industrial housing.' 
  },
];

import SubPageHero from '@/components/shared/SubPageHero';

export default function VideosPage() {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <main>
      <SubPageHero 
        badge="Visual Demos"
        title="Video Gallery"
        subtitle="Factory tours, process demos, and customer testimonials from the Europack team."
        bgImage="/images/banners/banner_action.png"
      />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, i) => (
              <div key={i} className="group rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-white border border-slate-100">
                <div className="relative aspect-video cursor-pointer" onClick={() => setPlaying(video.id + i)}>
                  {playing === video.id + i ? (
                    <iframe src={`https://www.youtube.com/embed/${video.id}?autoplay=1`} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen/>
                  ) : (
                    <>
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                      <div className="absolute inset-0 bg-[#1A1F2C]/40 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-[#FF6600] flex items-center justify-center shadow-2xl shadow-orange-500/50 group-hover:scale-110 transition-transform">
                          <Play size={24} fill="white" className="text-white ml-1"/>
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-[#1A1F2C]/80 text-white text-[11px] font-black">{video.duration}</div>
                    </>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-black text-[#1A1F2C] leading-tight mb-1">{video.title}</h3>
                  <p className="text-sm text-slate-500">{video.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-50 border-t border-slate-100 text-center">
        <p className="text-slate-500 mb-4">Want to see more of our work?</p>
        <Link href="/gallery" className="inline-flex items-center gap-2 bg-[#FF6600] text-white px-8 py-4 rounded-xl font-black uppercase text-[11px] tracking-widest hover:bg-[#e65c00] transition-colors">View Photo Gallery <ArrowRight size={14}/></Link>
      </section>
    </main>
  );
}

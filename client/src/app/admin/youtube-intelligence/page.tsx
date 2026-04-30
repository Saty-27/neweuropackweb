'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  TrendingUp, Globe, DollarSign, Youtube, 
  ArrowUpRight, Play, Eye, Share2, 
  ShieldCheck, Banknote, Cpu, BarChart, 
  Target, Award, Zap, AlertCircle, 
  ChevronRight, Calendar, Info, Package, Clock
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart as ReBarChart, Bar, Cell 
} from 'recharts';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import CountUp from 'react-countup';

// --- DATA LOGIC ---
const START_DATE = new Date('2026-04-01');
const END_DATE = new Date('2026-04-30');
const BASE_REVENUE = 7500;
const DAILY_INCREASE = 100;

// Geography URL for World Map
const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/master/world.json";

const worldData = [
  { name: "USA", coordinates: [-100, 40], earnings: 5000, color: "#ff6a00" },
  { name: "UK", coordinates: [-2, 54], earnings: 1500, color: "#ff6a00" },
  { name: "India", coordinates: [78, 20], earnings: 1000, color: "#ff6a00" },
  { name: "Others", coordinates: [0, 0], earnings: 500, color: "#4A5568" }
];

const benchmarkData = [
  { name: 'Europack', score: 32, total: 100, rank: '#32', color: '#ff6a00' },
  { name: 'BBC News', score: 95, total: 100, rank: '#5', color: '#3182CE' },
  { name: 'Marie Forleo', score: 88, total: 100, rank: '#12', color: '#805AD5' },
  // MrBeast was mentioned for rank #1
  { name: 'MrBeast', score: 100, total: 100, rank: '#1', color: '#38A169' }
];

const topVideos = [
  { 
    id: "1xEEsgImnvA", 
    title: "Heavy-Duty Export Crating Process", 
    earnings: 3200, 
    growth: 18, 
    progress: 85, 
    category: "Industrial Packing",
    trending: true 
  },
  { id: "ZVik4Qk0Y6Y", title: "Vacuum Sealing for Aerospace Components", earnings: 2100, growth: 12, progress: 60 },
  { id: "2Ah9304AH80", title: "Ocean Lashing Structure Analysis", earnings: 1850, growth: 9, progress: 45 },
  { id: "ZVik4Qk0Y6Y_dup", title: "VCI Anti-Rust Tech Deep Dive", earnings: 950, growth: 22, progress: 30 }
];

// --- COMPONENTS ---

const DashboardCard = ({ title, children, glow = false }: any) => (
  <div className={`p-8 rounded-[32px] bg-[#1A1F2C]/50 backdrop-blur-2xl border border-white/5 shadow-2xl relative overflow-hidden group ${glow ? 'shadow-orange-900/20' : ''}`}>
    {glow && (
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#ff6a00]/10 rounded-full blur-[80px]" />
    )}
    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8 flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-[#ff6a00]" />
      {title}
    </h3>
    {children}
  </div>
);

export default function YouTubeIntelligence() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Calculate current earnings logic
  const revenueStats = useMemo(() => {
    const today = new Date();
    const daysPassed = Math.floor((today.getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24));
    const currentTotal = BASE_REVENUE + (daysPassed * DAILY_INCREASE);
    const usdEquiv = (currentTotal / 84).toFixed(0); // Approx rate
    
    // Generate graph data
    const graphData = [...Array(30)].map((_, i) => ({
      day: i + 1,
      revenue: BASE_REVENUE + (i * DAILY_INCREASE)
    }));

    return { total: currentTotal, usd: usdEquiv, graphData, daysPassed };
  }, [currentDate]);

  return (
    <main className="min-h-screen bg-[#0a0d14] text-white p-8 space-y-8 font-sans">
      
      {/* 1. HERO SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-[#ff6a00] flex items-center justify-center shadow-lg shadow-orange-950/40">
                <Youtube className="text-white" size={24} />
             </div>
             <div>
                <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">Europack Youtube DashBoard</h1>
                <p className="text-slate-500 text-sm font-medium tracking-wide mt-1">Real-time content performance, revenue tracking, and global audience insights.</p>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-10">
           <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-md">
              <p className="text-[9px] font-black uppercase tracking-widest text-[#ff6a00] mb-1">Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest">System Active</span>
              </div>
           </div>
           <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-md">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Last Updated</p>
              <span className="text-xs font-black uppercase tracking-widest">{new Date().toLocaleTimeString()}</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         
         {/* BIG EARNINGS CARD */}
         <div className="lg:col-span-4 h-full">
            <DashboardCard title="Revenue Matrix" glow>
               <div className="space-y-10">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                       <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Total Earnings (INR)</span>
                       <div className="flex items-center gap-1 text-green-500 text-xs font-black">
                          <TrendingUp size={14}/> +₹100 today
                       </div>
                    </div>
                    <div className="flex items-baseline gap-4">
                       <div className="text-6xl font-black tracking-tighter text-[#ff6a00]">
                          ₹<CountUp end={revenueStats.total} separator="," duration={2.5} />
                       </div>
                       <div className="w-4 h-4 bg-orange-500/20 rounded-full flex items-center justify-center text-[#ff6a00]">
                          <ArrowUpRight size={10} />
                       </div>
                    </div>
                    <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">≈ ${revenueStats.usd} USD (Automated Conversion)</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Today</p>
                        <p className="text-xl font-black">₹100</p>
                     </div>
                     <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Yesterday</p>
                        <p className="text-xl font-black">₹100</p>
                     </div>
                  </div>

                  <div className="pt-6 border-t border-white/5">
                     <div className="flex items-center gap-4 p-4 bg-orange-500/5 border border-orange-500/20 rounded-2xl">
                        <Cpu className="text-[#ff6a00]" size={20} />
                        <div>
                           <p className="text-[10px] font-black text-white uppercase tracking-widest">Growth Forecast</p>
                           <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Expected Next Month: ₹12,000</p>
                        </div>
                     </div>
                  </div>
               </div>
            </DashboardCard>
         </div>

         {/* REVENUE GRAPH */}
         <div className="lg:col-span-8">
            <DashboardCard title="Revenue Accumulator (April Growth)">
               <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueStats.graphData}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ff6a00" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ff6a00" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis 
                        dataKey="day" 
                        stroke="#4A5568" 
                        fontSize={10} 
                        tickFormatter={(val) => `Apr ${val}`} 
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis stroke="#4A5568" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ background: '#1A1F2C', border: '1px solid #ffffff10', borderRadius: '12px' }}
                        itemStyle={{ color: '#ff6a00', fontWeight: 'bold' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#ff6a00" 
                        strokeWidth={4} 
                        fillOpacity={1} 
                        fill="url(#colorRev)" 
                        animationDuration={2000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
            </DashboardCard>
         </div>

         {/* GLOBAL EARNINGS MAP */}
         <div className="lg:col-span-7">
            <DashboardCard title="Global Revenue Footprint (Interactive)">
               <div className="h-[400px] bg-white/[0.02] rounded-3xl relative overflow-hidden flex items-center justify-center">
                  <ComposableMap projectionConfig={{ scale: 190 }}>
                    <Geographies geography={geoUrl}>
                      {({ geographies }: { geographies: any[] }) =>
                        geographies.map((geo) => (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#1A1F2C"
                            stroke="#ffffff10"
                            strokeWidth={0.5}
                            style={{
                              default: { outline: "none" },
                              hover: { fill: "#2D3748", outline: "none" },
                              pressed: { outline: "none" },
                            }}
                          />
                        ))
                      }
                    </Geographies>
                    {worldData.map((marker, i) => (
                      <Marker key={i} coordinates={marker.coordinates as any}>
                        <motion.circle 
                          r={6} 
                          fill={marker.color} 
                          initial={{ scale: 0 }}
                          animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.4, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        />
                        <text
                          textAnchor="middle"
                          y={-15}
                          style={{ fontFamily: "Inter", fill: "#CBD5E0", fontSize: "10px", fontWeight: "bold" }}
                        >
                          {marker.name}: ₹{marker.earnings}
                        </text>
                      </Marker>
                    ))}
                  </ComposableMap>
                  {/* Legend Overlay */}
                  <div className="absolute bottom-6 right-6 p-4 bg-slate-900 border border-white/5 rounded-2xl space-y-3">
                     {worldData.map(d => (
                        <div key={d.name} className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{d.name}</span>
                           <span className="text-[10px] font-black text-white ml-auto">₹{d.earnings} (≈${(d.earnings/84).toFixed(0)})</span>
                        </div>
                     ))}
                  </div>
               </div>
            </DashboardCard>
         </div>

         {/* SOURCE & AI INSIGHTS */}
         <div className="lg:col-span-5 flex flex-col gap-8">
            <DashboardCard title="Revenue Source Hub">
               <div className="flex items-center gap-6 p-6 bg-white/[0.03] rounded-3xl border border-white/5">
                  <div className="w-16 h-16 rounded-2xl bg-[#ff6a00]/10 flex items-center justify-center text-[#ff6a00] shadow-inner">
                     <Banknote size={32} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Account Entity</p>
                     <h4 className="text-xl font-black">Europack Solutions Ltd</h4>
                     <div className="flex items-center gap-2 mt-2">
                        <div className="px-2 py-0.5 rounded-md bg-green-500/10 text-green-500 text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                           <ShieldCheck size={10}/> Monetization Active
                        </div>
                        <span className="text-[9px] font-bold text-slate-500">Cycle: Monthly-Net-30</span>
                     </div>
                  </div>
               </div>
            </DashboardCard>

            <DashboardCard title="AI Intelligence Audit">
               <div className="space-y-6">
                  {[
                    { label: "Top-Performing Category", val: "Industrial Packaging", icon: <Package size={14}/> },
                    { label: "Best Engagement Window", val: "19:00 - 21:00 IST", icon: <Clock size={14}/> },
                    { label: "Optimization Recommendation", val: "30–60 sec Short-form", icon: <Zap size={14}/> }
                  ].map((insight, i) => (
                    <div key={i} className="flex gap-4 p-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors rounded-xl">
                       <div className="text-[#ff6a00] pt-1">{insight.icon}</div>
                       <div className="space-y-1">
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{insight.label}</p>
                          <p className="text-sm font-bold text-white">{insight.val}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </DashboardCard>
         </div>

         {/* TOP EARNING VIDEO (FEATURED) */}
         <div className="lg:col-span-12">
            <DashboardCard title="Prime Asset Performance">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="relative aspect-video rounded-[40px] overflow-hidden group">
                     {/* Feature Thumbnail (Mock) */}
                     <div className="absolute inset-0 bg-slate-800 animate-pulse" />
                     <img 
                      src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop" 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" 
                      alt="Thumbnail"
                     />
                     <div className="absolute inset-0 bg-gradient-to-tr from-[#ff6a00]/20 to-transparent" />
                     <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black to-transparent">
                        <div className="flex items-center gap-4">
                           <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-all duration-500 shadow-2xl">
                              <Play size={24} fill="white" />
                           </div>
                           <h4 className="text-2xl font-black text-white group-hover:text-orange-400 transition-colors">Industrial Crating: The Heavy Machinery Blueprint</h4>
                        </div>
                     </div>
                     <div className="absolute top-8 left-8 px-4 py-1.5 bg-[#ff6a00] text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xl animate-bounce">
                        Trending 🔥
                     </div>
                  </div>

                  <div className="space-y-10">
                     <div className="grid grid-cols-2 gap-8">
                        <div>
                           <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Featured Earnings</p>
                           <p className="text-5xl font-black text-white">₹3,200</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Audience Sentiment</p>
                           <p className="text-3xl font-black text-green-500 flex items-center gap-2">98.4% <Smile size={24}/> </p>
                        </div>
                     </div>
                     
                     <div className="space-y-6">
                        <div className="space-y-3">
                           <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                              <span>Conversion Efficiency</span>
                              <span>85%</span>
                           </div>
                           <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} transition={{ duration: 1.5 }} className="h-full bg-gradient-to-r from-[#ff6a00] to-orange-400" />
                           </div>
                        </div>
                        <div className="flex flex-wrap gap-4 pt-4">
                           <div className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                              <Eye size={14} className="text-[#ff6a00]"/> 12.5k Weekly
                           </div>
                           <div className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                              <Share2 size={14} className="text-[#ff6a00]"/> 450 Shares
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </DashboardCard>
         </div>

         {/* VIDEO PERFORMANCE LIST */}
         <div className="lg:col-span-12">
            <DashboardCard title="Earning Stream Distribution">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {topVideos.map((vid, i) => (
                    <div key={i} className="p-1.5 rounded-[40px] bg-gradient-to-br from-white/10 to-transparent border border-white/5 hover:border-[#ff6a00]/30 transition-all group">
                       <div className="bg-[#1A1F2C] p-8 rounded-[38px] h-full flex flex-col">
                          <div className="aspect-video rounded-3xl overflow-hidden mb-6 relative">
                             <img src={`https://images.unsplash.com/${i === 1 ? 'photo-1581092160562-40aa08e78837' : 'photo-1590496793910-3837a7f4749f'}?q=80&w=400&auto=format&fit=crop`} className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" alt="videoprev" />
                             <div className="absolute inset-0 flex items-center justify-center">
                                <Link href={`https://youtu.be/${vid.id}`} target="_blank" className="w-10 h-10 rounded-full bg-[#ff6a00] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                   <Play size={14} fill="white" />
                                </Link>
                             </div>
                          </div>
                          <h5 className="font-black text-sm mb-6 leading-tight group-hover:text-orange-400 transition-colors line-clamp-2">{vid.title}</h5>
                          <div className="mt-auto space-y-4">
                             <div className="flex items-end justify-between">
                                <div>
                                   <p className="text-[8px] font-black uppercase text-slate-500 tracking-widest mb-1">Total Earned</p>
                                   <p className="text-xl font-black">₹{vid.earnings}</p>
                                </div>
                                <span className="text-[10px] font-black text-green-500 uppercase">+{vid.growth}%</span>
                             </div>
                             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} whileInView={{ width: `${vid.progress}%` }} className="h-full bg-orange-500" />
                             </div>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </DashboardCard>
         </div>

         {/* CHANNEL BENCHMARKING */}
         <div className="lg:col-span-8">
            <DashboardCard title="Global Identity Benchmarking">
               <div className="space-y-12">
                  {benchmarkData.map((channel, i) => (
                    <div key={i} className="space-y-4">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-[#ff6a00] text-xs">
                                {channel.rank === '#1' ? <Award size={20}/> : channel.rank}
                             </div>
                             <div>
                                <h6 className="font-black text-sm">{channel.name}</h6>
                                {channel.name === 'Europack' && <p className="text-[10px] font-bold text-[#ff6a00] uppercase tracking-widest">Optimizing Growth</p>}
                             </div>
                          </div>
                          <div className="text-right">
                             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Engagement Score</span>
                             <p className="font-black text-sm">{channel.score}/100</p>
                          </div>
                       </div>
                       <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            whileInView={{ width: `${channel.score}%` }} 
                            transition={{ duration: 2 }}
                            style={{ background: channel.color }}
                            className="h-full relative" 
                          >
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-shimmer" />
                          </motion.div>
                       </div>
                    </div>
                  ))}
               </div>
            </DashboardCard>
         </div>

         {/* VIDEO RANKING & CTA */}
         <div className="lg:col-span-4 flex flex-col gap-8">
            <DashboardCard title="Engagement Leaderboard">
               <div className="space-y-4">
                  {[1,2,3,4,5].map(rank => (
                    <div key={rank} className="flex items-center gap-4 p-4 hover:bg-white/[0.03] transition-all rounded-2xl group cursor-pointer">
                       <span className="text-xs font-black text-slate-500 group-hover:text-[#ff6a00]">{rank}</span>
                       <div className="flex-1">
                          <p className="text-xs font-black text-white group-hover:text-orange-400 truncate">Video Analysis #{rank*102}</p>
                          <div className="flex items-center gap-4 mt-1">
                             <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Score: {95 - rank*2}</span>
                             <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Trending</span>
                          </div>
                       </div>
                       <ChevronRight size={14} className="text-slate-800 group-hover:text-white" />
                    </div>
                  ))}
               </div>
            </DashboardCard>

            <div className="p-8 bg-[#ff6a00] rounded-[40px] shadow-2xl shadow-orange-950/20 space-y-8">
               <h3 className="text-2xl font-black text-[#1A1F2C] tracking-tighter leading-none uppercase">Take Action</h3>
               <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-5 bg-[#1A1F2C] text-white rounded-[24px] font-black uppercase text-[10px] tracking-widest hover:translate-x-2 transition-transform">
                     Upload New Video <ArrowUpRight size={16}/>
                  </button>
                  <button className="w-full flex items-center justify-between p-5 bg-white/20 text-white rounded-[24px] font-black uppercase text-[10px] tracking-widest hover:translate-x-2 transition-transform">
                     Analyze Content <Target size={16}/>
                  </button>
                  <button className="w-full flex items-center justify-between p-5 bg-white/20 text-white rounded-[24px] font-black uppercase text-[10px] tracking-widest hover:translate-x-2 transition-transform">
                     Boost Performance <Zap size={16}/>
                  </button>
               </div>
            </div>
         </div>

      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite ease-in-out;
        }
      `}</style>
    </main>
  );
}

// Sub-components helpers
function Smile({ size, ...props }: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

// NextJS metadata (Not supported in client components, but good to have reference)
// title: 'YouTube Intelligence Dashboard | Europack Admin'

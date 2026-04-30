'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Users, BarChart3, Package, Layers, Activity, 
  TrendingUp, ArrowUpRight, Youtube, Eye, 
  PieChart, Layout, Quote, MessageSquare, 
  Globe, Zap, Plus, FileText, Send, 
  Target, Info, ChevronRight, Clock,
  ShieldCheck, MousePointer2, Briefcase
} from 'lucide-react';
import { useSocket } from '@/components/admin/SocketProvider';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart as RePie, Pie, Sector
} from 'recharts';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import CountUp from 'react-countup';
import { fetchAPI } from '@/lib/api';


// --- DATA & MOCK LOGIC ---
const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/master/world.json";

const trafficData = [
  { name: 'Mon', visitors: 45, pageViews: 120, activity: 80 },
  { name: 'Tue', visitors: 52, pageViews: 145, activity: 95 },
  { name: 'Wed', visitors: 48, pageViews: 130, activity: 88 },
  { name: 'Thu', visitors: 61, pageViews: 180, activity: 120 },
  { name: 'Fri', visitors: 55, pageViews: 160, activity: 110 },
  { name: 'Sat', visitors: 67, pageViews: 200, activity: 140 },
  { name: 'Sun', visitors: 72, pageViews: 220, activity: 155 },
];

const categoryData = [
  { name: 'Wooden Pallets', value: 45, color: '#ff6a00' },
  { name: 'Boxes', value: 30, color: '#ff8533' },
  { name: 'Materials', value: 15, color: '#ffa366' },
  { name: 'Laminates', value: 7, color: '#ffc299' },
  { name: 'Others', value: 3, color: '#ffe0cc' },
];

const productGrowthData = [
  { month: 'Jan', added: 12 },
  { month: 'Feb', added: 18 },
  { month: 'Mar', added: 15 },
  { month: 'Apr', added: 25 },
];

const countryTraffic = [
  { name: 'India', visitors: 45, color: '#ff6a00', coord: [78, 20] },
  { name: 'USA', visitors: 18, color: '#3182CE', coord: [-100, 40] },
  { name: 'UK', visitors: 12, color: '#805AD5', coord: [-2, 54] },
  { name: 'Germany', visitors: 8, color: '#ff6a00', coord: [10, 51] },
  { name: 'UAE', visitors: 6, coord: [54, 24] },
  { name: 'Canada', visitors: 4, coord: [-106, 56] },
  { name: 'Australia', visitors: 3, coord: [133, -25] },
  { name: 'Singapore', visitors: 2, coord: [103, 1] },
];

const pagePerformance = [
  { name: 'Homepage', views: 2450, engagement: 88, leads: 12 },
  { name: 'Products Page', views: 1890, engagement: 72, leads: 8 },
  { name: 'Blog Page', views: 950, engagement: 65, leads: 2 },
  { name: 'Contact Page', views: 420, engagement: 95, leads: 15 },
];

const activityFeed = [
  { id: 1, action: "User visited Euro Pallet page", time: "2 mins ago", icon: <Eye size={12}/> },
  { id: 2, action: "Blog: 'Export Rules' opened", time: "5 mins ago", icon: <FileText size={12}/> },
  { id: 3, action: "Contact form viewed (USA)", time: "12 mins ago", icon: <Users size={12}/> },
  { id: 4, action: "New session started from Mumbai", time: "15 mins ago", icon: <Activity size={12}/> },
];

// --- COMPONENTS ---

const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-8">
    <h2 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-2">
       <div className="w-1.5 h-6 bg-[#ff6a00] rounded-full" />
       {title}
    </h2>
    {subtitle && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 ml-4">{subtitle}</p>}
  </div>
);

const GlassCard = ({ children, className = "", title, glow = false }: any) => (
  <div className={`bg-[#11141d]/80 backdrop-blur-2xl border border-white/5 rounded-[32px] p-8 relative overflow-hidden group shadow-2xl ${className} ${glow ? 'hover:border-orange-500/30' : ''}`}>
    {glow && (
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#ff6a00]/5 rounded-full blur-[80px] group-hover:bg-[#ff6a00]/10 transition-colors" />
    )}
    {title && (
      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#ff6a00]" />
        {title}
      </h3>
    )}
    {children}
  </div>
);

const MetricCard = ({ title, value, growth, subtext, icon, sparkline }: any) => (
  <GlassCard glow>
    <div className="flex justify-between items-start mb-6">
       <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#ff6a00] group-hover:scale-110 transition-transform">
          {icon}
       </div>
       {growth && (
         <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
            {growth} <TrendingUp size={12} />
         </div>
       )}
    </div>
    <div className="space-y-1">
       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{title}</p>
       <h4 className="text-3xl font-black text-white tracking-tighter">
         <CountUp end={value} duration={2} separator="," />
       </h4>
       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{subtext}</p>
    </div>
    {sparkline && (
      <div className="h-10 w-full mt-6 opacity-40 group-hover:opacity-100 transition-opacity">
         <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[...Array(10)].map((_, i) => ({ v: Math.random() * 100 }))}>
               <Area type="monotone" dataKey="v" stroke="#ff6a00" fill="#ff6a00" fillOpacity={0.1} strokeWidth={2} isAnimationActive={false} />
            </AreaChart>
         </ResponsiveContainer>
      </div>
    )}
  </GlassCard>
);

export default function CommandCenter() {
  const [activeTab, setActiveTab] = useState('30d');
  const [loading, setLoading] = useState(true);
  const socket = useSocket();
  const [stats, setStats] = useState({
    visitors: { daily: 0, monthly: 0, lifetime: 0 }
  });

  useEffect(() => {
    const fetchRealStats = async () => {
      try {
        const res = await fetchAPI('/analytics/stats');
        if (res.success) {
          setRealStats(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRealStats();
  }, []);

  const [realStats, setRealStats] = useState<any>(null);

  useEffect(() => {
    if (socket) {
      socket.on('statsUpdate', (newStats: any) => {
        setStats(newStats);
      });
    }
  }, [socket]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0d14] flex items-center justify-center">
         <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: 360 }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 border-4 border-[#ff6a00] border-t-transparent rounded-full"
         />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0d14] text-white p-8 space-y-12">
      
      {/* HEADER DECK */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">Europack DashBoard</h1>
        </div>
        <div className="flex items-center gap-6">
           <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-3xl backdrop-blur-md flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
              <div className="text-right">
                 <p className="text-[9px] font-black uppercase text-slate-500">System Integrity</p>
                 <p className="text-[10px] font-black uppercase">Alpha Protocol Active</p>
              </div>
           </div>
           <button className="p-4 bg-[#ff6a00] rounded-2xl hover:bg-orange-600 transition-colors shadow-xl shadow-orange-950/20">
              <Plus size={24} className="text-white" />
           </button>
        </div>
      </div>

      {/* SECTION 1: PRIMARY METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <MetricCard title="Total Page Views" value={realStats?.totalVisits || 0} growth="↑ Real" subtext="All time" icon={<Eye size={20}/>} sparkline />
        <MetricCard title="Unique Visitors" value={realStats?.uniqueVisitors || 0} subtext="Total sessions" icon={<Users size={20}/>} />
        <MetricCard title="Monthly Traffic" value={stats.visitors.monthly} subtext="Total this month" icon={<Globe size={20}/>} />
        <MetricCard title="Active Quotes" value={0} subtext="Pending response" icon={<Quote size={20}/>} />
        <MetricCard title="System Uptime" value={100} subtext="Network stable" icon={<Zap size={20}/>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SECTION 2: YOUTUBE INTELLIGENCE LINK */}
        <div className="lg:col-span-4">
           <Link href="/admin/youtube-intelligence" className="block h-full transition-transform hover:-translate-y-2">
              <GlassCard title="YouTube Earnings Intelligence" className="h-full !bg-gradient-to-br from-red-600/10 to-orange-600/10 !border-orange-500/20 shadow-orange-950/20">
                 <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-red-500">
                       <Youtube size={32} />
                    </div>
                    <div className="text-right">
                       <p className="text-3xl font-black text-white">₹0</p>
                       <p className="text-xs font-black text-emerald-500 uppercase">+₹0 today</p>
                    </div>
                 </div>
                 
                 <div className="h-20 w-full mb-8">
                    <ResponsiveContainer width="100%" height="100%">
                       <LineChart data={[...Array(12)].map((_, i) => ({ v: 0 }))}>
                          <Line type="monotone" dataKey="v" stroke="#ff6a00" strokeWidth={3} dot={false} />
                       </LineChart>
                    </ResponsiveContainer>
                 </div>

                 <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="aspect-video w-16 bg-slate-800 rounded-lg overflow-hidden relative">
                       <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-white uppercase truncate">Industrial Crating: The Blueprint</p>
                       <p className="text-[8px] font-bold text-slate-500 uppercase">Top Performer</p>
                    </div>
                 </div>

                 <div className="mt-8 flex items-center justify-between text-[#ff6a00]">
                    <span className="text-[10px] font-black uppercase tracking-widest underline decoration-2 underline-offset-4">Open Full Analytics</span>
                    <ArrowUpRight size={18} />
                 </div>
              </GlassCard>
           </Link>
        </div>

        {/* SECTION 3: TRAFFIC ANALYTICS */}
        <div className="lg:col-span-8">
           <GlassCard title="Traffic & Engagement Overview">
              <div className="flex justify-end gap-2 mb-8">
                 {['7d', '30d'].map(t => (
                    <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === t ? 'bg-[#ff6a00] text-white shadow-lg' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}>
                       {t === '7d' ? '7 Days' : '30 Days'}
                    </button>
                 ))}
              </div>
              <div className="h-[300px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trafficData}>
                       <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                       <XAxis dataKey="name" stroke="#4a5568" fontSize={10} axisLine={false} tickLine={false} />
                       <YAxis stroke="#4a5568" fontSize={10} axisLine={false} tickLine={false} />
                       <Tooltip contentStyle={{ background: '#11141d', border: '1px solid #ffffff10', borderRadius: '16px' }} />
                       <Line type="monotone" dataKey="visitors" stroke="#ff6a00" strokeWidth={4} dot={{ r: 4, fill: '#ff6a00' }} activeDot={{ r: 6 }} animationDuration={2000} />
                       <Line type="monotone" dataKey="pageViews" stroke="#3182CE" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                       <Line type="monotone" dataKey="activity" stroke="#805AD5" strokeWidth={2} dot={false} />
                    </LineChart>
                 </ResponsiveContainer>
              </div>
              <div className="flex gap-8 mt-6 justify-center">
                 {[{ name: 'Visitors', color: '#ff6a00' }, { name: 'Page Views', color: '#3182CE' }, { name: 'Sessions', color: '#805AD5' }].map(l => (
                    <div key={l.name} className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                       <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{l.name}</span>
                    </div>
                 ))}
              </div>
           </GlassCard>
        </div>

        {/* SECTION 4: PRODUCT INTELLIGENCE PANEL */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
           <GlassCard title="Category Distribution">
              <div className="h-[250px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <RePie>
                       <Pie 
                        data={categoryData} 
                        innerRadius={60} 
                        outerRadius={80} 
                        paddingAngle={5} 
                        dataKey="value" 
                        animationDuration={1500}
                       >
                         {categoryData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                         ))}
                       </Pie>
                       <Tooltip />
                    </RePie>
                 </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                 {categoryData.slice(0, 3).map(c => (
                    <div key={c.name} className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                          <span className="text-[10px] font-black uppercase text-slate-400">{c.name}</span>
                       </div>
                       <span className="text-xs font-black">{c.value}%</span>
                    </div>
                 ))}
              </div>
           </GlassCard>

           <GlassCard title="Product Growth Pipeline">
              <div className="h-[250px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productGrowthData}>
                       <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                       <XAxis dataKey="month" stroke="#4a5568" fontSize={10} axisLine={false} tickLine={false} />
                       <YAxis stroke="#4a5568" fontSize={10} axisLine={false} tickLine={false} />
                       <Tooltip />
                       <Bar dataKey="added" fill="#ff6a00" radius={[8, 8, 0, 0]} animationDuration={1500} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
              <div className="p-4 bg-orange-500/5 rounded-2xl border border-orange-500/10 mt-4">
                 <div className="flex items-center gap-3">
                    <TrendingUp size={16} className="text-[#ff6a00]" />
                    <p className="text-[9px] font-black uppercase tracking-widest">Inventory Expansion: High</p>
                 </div>
              </div>
           </GlassCard>
        </div>

        {/* SECTION 5: PAGE PERFORMANCE SUMMARY */}
        <div className="lg:col-span-5">
           <GlassCard title="Page Intelligence System">
              <div className="space-y-6">
                 {pagePerformance.map(page => (
                    <div key={page.name} className="group/page">
                       <div className="flex justify-between items-center mb-3">
                          <div>
                             <p className="text-sm font-black text-white group-hover/page:text-[#ff6a00] transition-colors">{page.name}</p>
                             <div className="text-white/90 text-lg md:text-[24px] max-w-3xl font-medium leading-relaxed text-center mx-auto-500 uppercase tracking-widest mt-1">
                                <span>{page.views.toLocaleString()} Views</span>
                                <span>{page.leads} Leads Generated</span>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="text-xs font-black text-[#ff6a00]">{page.engagement}%</p>
                             <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Engagement</p>
                          </div>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${page.engagement}%` }} transition={{ duration: 1 }} className="h-full bg-orange-500" />
                       </div>
                    </div>
                 ))}
              </div>
              <div className="mt-10 h-[150px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pagePerformance} layout="vertical">
                       <XAxis type="number" hide />
                       <YAxis type="category" dataKey="name" hide />
                       <Bar dataKey="views" fill="#ff6a00" radius={[0, 4, 4, 0]} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </GlassCard>
        </div>

        {/* SECTION 6 & 7: BLOG & CRM */}
        <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-8 h-fit">
           <GlassCard title="Blog Architecture Hub">
              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Articles</p>
                       <p className="text-2xl font-black">18</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Avg Read Time</p>
                       <p className="text-2xl font-black">4.5m</p>
                    </div>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[8px] font-black uppercase text-slate-500 tracking-widest mb-2">Most Read Article</p>
                    <p className="text-xs font-bold text-white line-clamp-1">ISPM-15 vs Heat Treatment: A Guide</p>
                 </div>
                 <div className="h-24 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={trafficData}>
                          <Area type="step" dataKey="visitors" stroke="#ff6a00" fill="#ff6a00" fillOpacity={0.1} />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </GlassCard>

           <GlassCard title="CRM Lead Pipeline">
              <div className="flex flex-col gap-6 items-center">
                 {[
                   { label: 'Visitors', count: 639, color: 'bg-white/10' },
                   { label: 'Leads', count: 0, color: 'bg-white/5' },
                   { label: 'Quotes', count: 0, color: 'bg-orange-500/10' },
                   { label: 'Converted', count: 0, color: 'bg-emerald-500/10' }
                 ].map((stage, i) => (
                    <div key={stage.label} className="w-full relative">
                       <div className={`p-4 rounded-2xl ${stage.color} border border-white/5 flex justify-between items-center`}>
                          <span className="text-[10px] font-black uppercase tracking-widest">{stage.label}</span>
                          <span className="text-sm font-black">{stage.count}</span>
                       </div>
                       {i < 3 && (
                          <div className="flex justify-center -my-2 opacity-30">
                             <ChevronDown size={16} />
                          </div>
                       )}
                    </div>
                 ))}
              </div>
           </GlassCard>
        </div>

        {/* SECTION 8: GLOBAL TRAFFIC SOURCE MAP */}
        <div className="lg:col-span-6">
           <GlassCard title="Global Traffic Sources (Visitors %)">
              <div className="h-[350px] bg-white/[0.02] rounded-3xl relative overflow-hidden flex items-center justify-center">
                  <ComposableMap projectionConfig={{ scale: 190 }}>
                    <Geographies geography={geoUrl}>
                      {({ geographies }: { geographies: any[] }) =>
                        geographies.map((geo) => (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#11141d"
                            stroke="#ffffff05"
                            strokeWidth={0.5}
                            style={{ default: { outline: "none" }, hover: { fill: "#1A1F2C", outline: "none" } }}
                          />
                        ))
                      }
                    </Geographies>
                    {countryTraffic.map((country, i) => (
                      <Marker key={i} coordinates={country.coord as any}>
                        <motion.circle 
                          r={4 + country.visitors/10} 
                          fill={country.color || "#ff6a00"} 
                          initial={{ scale: 0 }}
                          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.3, 0.6] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        <title>{country.name}: {country.visitors}%</title>
                      </Marker>
                    ))}
                  </ComposableMap>
                  <div className="absolute bottom-6 right-6 p-4 bg-slate-900 border border-white/5 rounded-2xl space-y-2">
                     {countryTraffic.slice(0, 3).map(c => (
                        <div key={c.name} className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                           <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{c.name}</span>
                           <span className="text-[9px] font-black text-white ml-auto">{c.visitors}%</span>
                        </div>
                     ))}
                  </div>
              </div>
           </GlassCard>
        </div>

        {/* SECTION 9: COUNTRY TRAFFIC BAR GLASS */}
        <div className="lg:col-span-7">
           <GlassCard title="Top Traffic Rankings">
              <div className="h-[300px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={countryTraffic} layout="vertical">
                       <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                       <XAxis type="number" stroke="#4a5568" fontSize={10} axisLine={false} tickLine={false} />
                       <YAxis type="category" dataKey="name" stroke="#cbd5e0" fontSize={10} axisLine={false} tickLine={false} width={80} />
                       <Tooltip cursor={{ fill: '#ffffff05' }} />
                       <Bar dataKey="visitors" radius={[0, 8, 8, 0]}>
                          {countryTraffic.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? '#ff6a00' : '#ffffff10'} />
                          ))}
                       </Bar>
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </GlassCard>
        </div>

        {/* SECTION 10: REAL-TIME ACTIVITY FEED */}
        <div className="lg:col-span-5 flex flex-col gap-8">
           <GlassCard title="Live Ecosystem Loop">
              <div className="space-y-4">
                 <AnimatePresence>
                    {activityFeed.map((item, i) => (
                       <motion.div 
                        key={item.id} 
                        initial={{ opacity: 0, x: 20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 p-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-all"
                       >
                          <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                             {item.icon}
                          </div>
                          <div className="flex-1">
                             <p className="text-[11px] font-bold text-white">{item.action}</p>
                             <p className="text-[8px] font-black uppercase text-slate-500 tracking-widest">{item.time}</p>
                          </div>
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                       </motion.div>
                    ))}
                 </AnimatePresence>
              </div>
           </GlassCard>

           {/* SECTION 11: AI INSIGHT PANEL */}
           <GlassCard title="Strategic AI Insights">
              <div className="space-y-4">
                 {[
                   { label: "Product page traffic spike detected", type: "positive", icon: <TrendingUp size={14}/> },
                   { label: "Blog engagement up by 24% this week", type: "positive", icon: <BarChart3 size={14}/> },
                   { label: "Conversion rate below industrial average", type: "warning", icon: <Zap size={14}/> }
                 ].map((insight, i) => (
                    <div key={i} className={`p-4 rounded-2xl border ${insight.type === 'positive' ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-500' : 'bg-orange-500/5 border-orange-500/10 text-orange-300'} flex items-center gap-4`}>
                       {insight.icon}
                       <p className="text-[10px] font-black uppercase tracking-widest">{insight.label}</p>
                    </div>
                 ))}
              </div>
           </GlassCard>
        </div>

        {/* SECTION 12: QUICK ACTION PANEL */}
        <div className="lg:col-span-12">
           <GlassCard title="Mission Control Rapid Actions" className="!bg-[#ff6a00] !border-none !p-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                 {[
                   { name: 'Add Product', icon: <Package size={20}/>, href: '/admin/products/create' },
                   { name: 'Create Blog', icon: <FileText size={20}/>, href: '/admin/cms/blog/create' },
                   { name: 'View Leads', icon: <Users size={20}/>, href: '/admin/leads' },
                   { name: 'Open CRM', icon: <Briefcase size={20}/>, href: '/admin/quotes' }
                 ].map(action => (
                    <Link key={action.name} href={action.href} className="p-6 bg-slate-900 rounded-3xl flex items-center justify-between group hover:bg-white hover:text-black transition-all shadow-2xl shadow-orange-950/40">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-500 group-hover:bg-orange-500 group-hover:text-white flex items-center justify-center transition-colors">
                             {action.icon}
                          </div>
                          <span className="font-black uppercase text-[11px] tracking-widest">{action.name}</span>
                       </div>
                       <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                 ))}
              </div>
           </GlassCard>
        </div>

      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}

function ChevronDown({ size, ...props }: any) {
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
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}

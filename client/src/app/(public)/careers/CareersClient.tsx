'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, MapPin, Briefcase, Clock, CheckCircle2, 
  Search, Filter, ChevronDown, ChevronRight,
  Heart, TrendingUp, Truck, Globe, Award, Users,
  MessageSquare, Plus, Minus, Download, Send, Phone, Quote
} from 'lucide-react';
import Image from 'next/image';
import JobApplyModal from '@/components/layout/JobApplyModal';
import PartnerModal from '@/components/layout/PartnerModal';
import { fetchAPI } from '@/lib/api';

interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  fullDescription: string;
  requirements: string[];
  active: boolean;
}

// --- DATA --- //

const stats = [
  { value: '33+', label: 'Years Experience', suffix: '' },
  { value: '1000+', label: 'Global Customers', suffix: '' },
  { value: '500+', label: 'Export Projects', suffix: '' },
  { value: 'PAN', label: 'India Operations', suffix: '' },
];

const cultureItems = [
  { icon: Heart, title: 'Health First', desc: 'Comprehensive family health insurance and wellness programs.' },
  { icon: TrendingUp, title: 'Rapid Growth', desc: 'Performance-linked bonuses and clear career progression paths.' },
  { icon: Truck, title: 'Logistics Mastery', desc: 'Hands-on exposure to India\'s most complex packaging projects.' },
  { icon: Globe, title: 'Global Exposure', desc: 'Work with international standards like ISPM-15 and EPAL.' },
];

const openPositions = [
  { 
    id: 'pe-01',
    title: 'Senior Packaging Engineer', 
    dept: 'Engineering', 
    location: 'Mumbai, MH', 
    type: 'Full-Time', 
    exp: '5+ years', 
    desc: 'Design custom wooden crating and export packaging solutions for heavy industrial equipment.',
    fullDesc: 'As a Senior Packaging Engineer, you will lead the design of structural crating for turbines, generators, and aerospace components. You will use high-fidelity CAD tools to simulate load-bearing requirements and ensure 100% security during sea-freight transit.'
  },
  { 
    id: 'op-01',
    title: 'Lashing & Securing Specialist', 
    dept: 'Operations', 
    location: 'Mumbai, MH', 
    type: 'Full-Time', 
    exp: '3+ years', 
    desc: 'Execute high-tension lashing plans for ODC cargo, containers, and flatracks.',
    fullDesc: 'You will be on-site at major ports and manufacturing hubs, leading technical teams in securing multi-ton cargo. Precision and safety are non-negotiable in this role.'
  },
  { 
    id: 'sl-01',
    title: 'Export Sales Manager', 
    dept: 'Sales & BD', 
    location: 'Mumbai / Pune', 
    type: 'Full-Time', 
    exp: '4+ years', 
    desc: 'Drive B2B packaging solution sales to manufacturers and EPC companies across India.',
    fullDesc: 'Manage high-value corporate accounts and drive revenue growth through consultative sales of complex industrial packaging solutions.'
  },
];

const hiringSteps = [
  { step: '01', title: 'Apply Online', desc: 'Submit your CV and portfolio through our website.' },
  { step: '02', title: 'Screening Call', desc: 'Initial discussion with our HR team.' },
  { step: '03', title: 'Technical Interview', desc: 'Deep dive into your industry expertise.' },
  { step: '04', title: 'Final Discussion', desc: 'Meet the leadership team.' },
  { step: '05', title: 'The Offer', desc: 'Welcome to the Europack Ecosystem.' },
];

const lifeImages = [
  { url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop', title: 'Warehouse Operations' },
  { url: 'https://images.unsplash.com/photo-1565891741441-64926e441838?q=80&w=2070&auto=format&fit=crop', title: 'On-Site Lashing' },
  { url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop', title: 'Precision Engineering' },
  { url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop', title: 'Export Loading' },
];

// --- COMPONENTS --- //

const SectionHeader = ({ tag, title, desc, centered = false }: { tag: string, title: string, desc?: string, centered?: boolean }) => (
  <div className={`space-y-4 mb-16 ${centered ? 'text-center' : ''}`}>
    <span className={`inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-black uppercase tracking-[0.3em] ${centered ? 'mx-auto' : ''}`}>
      {tag}
    </span>
    <h2 className="text-4xl md:text-5xl font-black text-[#1A1F2C] tracking-tighter leading-none">
      {title}
    </h2>
    {desc && <p className={`text-slate-500 text-lg max-w-2xl font-medium leading-relaxed ${centered ? 'mx-auto text-center' : ''}`}>{desc}</p>}
  </div>
);

export default function CareersClient() {
  const [activeDept, setActiveDept] = useState('All');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(0);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | undefined>(undefined);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [settings, setSettings] = useState<{ visible: boolean }>({ visible: true });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [jobsRes, settingsRes] = await Promise.all([
          fetchAPI('/jobs?active=true'),
          fetchAPI('/jobs/settings')
        ]);
        if (jobsRes.success) setJobs(jobsRes.jobs);
        if (settingsRes.success) setSettings(settingsRes.settings);
      } catch (error) {
        console.error('Error loading careers data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const departments = ['All', ...Array.from(new Set(jobs.map(j => j.department)))];
  const filteredJobs = activeDept === 'All' ? jobs : jobs.filter(j => j.department === activeDept);

  if (!settings.visible) {
    return (
      <div className="bg-[#1A1F2C] min-h-screen flex items-center justify-center text-center p-6">
        <div className="max-w-2xl space-y-8">
          <div className="w-24 h-24 bg-orange-500/10 rounded-[32px] flex items-center justify-center text-[#FF6600] mx-auto animate-bounce">
            <Briefcase size={48} />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Hiring is Currently <span className="text-[#FF6600]">Paused.</span>
          </h1>
          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            We are not actively recruiting for new roles at this moment. However, we always value exceptional talent. Feel free to reach out to us for future opportunities.
          </p>
          <div className="pt-8">
            <a 
              href="/contact"
              className="px-10 py-5 bg-[#FF6600] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#E65C00] transition-all shadow-[0_20px_40px_rgba(255,102,0,0.3)] no-underline inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC]">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[600px] md:h-screen md:min-h-[700px] flex items-center overflow-hidden bg-[#1A1F2C] pt-24 md:pt-0">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/banners/careers.png" 
            alt="Build a Career at Europack" 
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1F2C] via-[#1A1F2C]/80 to-transparent" />
          {/* Animated Background Dots Grid */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FF6600_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="container max-w-[90rem] mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl space-y-8"
          >

            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.9] md:leading-[0.85] mb-8">
              Build a Career <br /> at <span className="text-[#FF6600]">Europack.</span>
            </h1>
            <p className="text-slate-300 text-xl font-medium leading-relaxed max-w-2xl">
              Powering global logistics through precision packaging. Join a team of 2500+ workforce and specialists who protect what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <button 
                onClick={() => document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-[#FF6600] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#E65C00] transition-all shadow-[0_20px_40px_rgba(255,102,0,0.3)]"
              >
                View Open Roles
              </button>
              <button 
                onClick={() => setIsPartnerModalOpen(true)}
                className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md"
              >
                Partner With Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. COMPANY IMPACT SECTION */}
      <section className="py-24 bg-white">
        <div className="container max-w-[90rem] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-10 rounded-[48px] bg-slate-50 border border-slate-100 hover:border-[#FF6600]/20 hover:shadow-2xl hover:shadow-orange-500/5 transition-all text-center md:text-left"
              >
                <div className="text-5xl font-black text-[#1A1F2C] tracking-tighter mb-2">
                  <span className="text-[#FF6600]">{stat.value}</span>{stat.suffix}
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CULTURE SECTION */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="container max-w-[90rem] mx-auto px-6">
          <SectionHeader 
            tag="Our Core Values"
            title="We Don't Just Pack — We Power Trade."
            desc="At Europack, our team members are the structural integrity of our organization."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cultureItems.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-[#1A1F2C] rounded-2xl flex items-center justify-center text-[#FF6600] mb-8 group-hover:rotate-6 transition-transform">
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-black text-[#1A1F2C] mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY JOIN EUROPACK */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container max-w-[90rem] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="lg:w-1/2 space-y-12">
              <SectionHeader 
                tag="The Professional Advantage"
                title="Why Professionals Choose Europack."
                desc="Work alongside the experts who define industrial packaging standards in India."
              />
              <div className="space-y-8">
                {[
                  { title: 'Signature Industrial Projects', desc: 'Direct exposure to turbines, aerospace components, and heavy engineering.' },
                  { title: 'On-Ground & Corporate Blend', desc: 'Hybrid learning between field operations and strategic engineering design.' },
                  { title: 'Global Compliance Expertise', desc: 'Master ISPM-15, EPAL, and international maritime security standards.' },
                  { title: 'Performance Culture', desc: 'Merit-based growth paths for high-performing technical specialists.' },
                ].map((point, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-6 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#FF6600] shrink-0 group-hover:scale-110 transition-transform">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-[#1A1F2C] mb-1">{point.title}</h4>
                      <p className="text-slate-500 font-medium text-sm">{point.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
                  alt="Industrial Engineer" 
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative Floating Card */}
              <div className="absolute -bottom-10 -left-10 bg-[#1A1F2C] p-8 rounded-[40px] text-white shadow-2xl max-w-[280px] hidden xl:block">
                <p className="text-2xl font-black mb-2 text-[#FF6600]">2500+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-relaxed">Active professionals ensuring 100% security for global cargo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LIFE AT EUROPACK (Auto-sliding Horizontal Gallery) */}
      <section className="py-24 bg-[#1A1F2C] overflow-hidden">
        <div className="container max-w-[90rem] mx-auto px-6 mb-16 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-8">
           <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-black uppercase tracking-[0.3em]">
                Day-In-The-Life
              </span>
              <h2 className="text-5xl font-black text-white tracking-tighter leading-none">
                A Day Inside <span className="text-[#FF6600]">Europack.</span>
              </h2>
           </div>
           <p className="text-slate-300 text-lg max-w-xl font-medium leading-relaxed">
             From deep engineering design to high-tension field lashing, our team is in constant motion.
           </p>
        </div>

        {/* Scrolling Track */}
        <div className="flex gap-8 overflow-hidden relative">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap min-w-max px-6"
          >
            {[...lifeImages, ...lifeImages].map((img, i) => (
              <div key={i} className="w-[450px] relative aspect-video rounded-[40px] overflow-hidden group shadow-2xl">
                 <Image src={img.url} alt={img.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] via-transparent to-transparent opacity-60" />
                 <div className="absolute bottom-8 left-8">
                    <p className="text-white font-black text-xl tracking-tight">{img.title}</p>
                    <p className="text-orange-400 text-[9px] font-black uppercase tracking-widest">Europack Operations Hub</p>
                 </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. OPEN POSITIONS SECTION */}
      <section id="roles" className="py-24 bg-[#F8FAFC]">
        <div className="container max-w-[90rem] mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
            <SectionHeader 
              tag="Careers Matrix"
              title="Current Opportunities."
              desc={jobs.length > 0 ? `Explore Europack. We hire for potential, not just positions.` : "Check back soon for new opportunities."}
            />
            
            {/* Filters */}
            <div className="flex flex-wrap gap-4 pt-8">
               {departments.map((dept) => (
                 <button 
                   key={dept}
                   onClick={() => setActiveDept(dept)}
                   className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeDept === dept ? 'bg-[#FF6600] text-white shadow-xl shadow-orange-500/20' : 'bg-white text-slate-400 hover:text-slate-600 border border-slate-100'}`}
                 >
                   {dept}
                 </button>
               ))}
            </div>
          </div>

          <div className="space-y-6 max-w-6xl">
            <AnimatePresence mode='wait'>
              {filteredJobs.length === 0 ? (
                <div className="bg-white p-20 rounded-[40px] text-center border border-slate-100">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-300">
                    <Search size={32} />
                  </div>
                  <p className="text-slate-500 text-lg font-bold">No positions found in this department.</p>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <motion.div 
                    key={job._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`group bg-white rounded-[40px] border border-slate-100 overflow-hidden transition-all duration-500 ${expandedJob === job._id ? 'shadow-2xl ring-2 ring-[#FF6600]/10' : 'hover:shadow-xl'}`}
                  >
                    <div 
                      onClick={() => setExpandedJob(expandedJob === job._id ? null : job._id)}
                      className="p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 cursor-pointer"
                    >
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <span className="px-3 py-1 rounded-lg bg-orange-100 text-[#FF6600] text-[8px] font-black uppercase tracking-widest">{job.department}</span>
                          <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-500 text-[8px] font-black uppercase tracking-widest">{job.type}</span>
                        </div>
                        <h3 className="text-2xl font-black text-[#1A1F2C] tracking-tight group-hover:text-[#FF6600] transition-colors">{job.title}</h3>
                        <div className="flex flex-wrap gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <span className="flex items-center gap-2"><MapPin size={12} className="text-[#FF6600]"/> {job.location}</span>
                          <span className="flex items-center gap-2"><Briefcase size={12} className="text-[#FF6600]"/> {job.department}</span>
                          <span className="flex items-center gap-2"><Clock size={12} className="text-[#FF6600]"/> {job.experience}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                         <button 
                           onClick={(e) => {
                             e.stopPropagation();
                             setSelectedJob(job.title);
                             setIsApplyModalOpen(true);
                           }}
                           className="px-10 py-5 bg-[#1A1F2C] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#FF6600] transition-all"
                         >
                            Apply Now
                         </button>
                         <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[#FF6600] transition-all ${expandedJob === job._id ? 'rotate-180 bg-orange-50' : ''}`}>
                            <ChevronDown size={20} />
                         </div>
                      </div>
                    </div>
                    
                    {expandedJob === job._id && (
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        className="px-10 pb-10 border-t border-slate-50"
                      >
                        <div className="pt-10 max-w-3xl space-y-8">
                           <div className="space-y-4">
                              <h4 className="text-[10px] font-black text-[#FF6600] uppercase tracking-widest">Role Description</h4>
                              <p className="text-slate-500 text-sm font-medium leading-relaxed">{job.fullDescription}</p>
                           </div>
                           <div className="space-y-4">
                              <h4 className="text-[10px] font-black text-[#FF6600] uppercase tracking-widest">Technical Requirements</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 {job.requirements.map((req, ridx) => (
                                   <div key={ridx} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF6600]" />
                                      {req}
                                   </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 7. HIRING PROCESS (Horizontal Timeline) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container max-w-[90rem] mx-auto px-6">
          <SectionHeader 
            tag="The Journey"
            title="Simple & Transparent Hiring."
            desc="We value your time. Our 5-step process is designed for clarity and speed."
            centered
          />
          
          <div className="relative mt-20">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 -translate-y-1/2 hidden lg:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 relative z-10">
              {hiringSteps.map((s, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#1A1F2C] text-white flex items-center justify-center mx-auto text-xl font-black shadow-xl group-hover:bg-[#FF6600] group-hover:scale-110 transition-all duration-500 ring-8 ring-white">
                    {s.step}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-[#1A1F2C] tracking-tight">{s.title}</h4>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed px-4">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. PARTNERSHIP / AFFILIATE SECTION */}
      <section id="partners" className="py-24 bg-[#1A1F2C] overflow-hidden rounded-[80px] mx-6 my-12">
        <div className="container max-w-[90rem] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative">
               <div className="aspect-square rounded-[60px] overflow-hidden relative">
                  <Image 
                    src="/images/about/factory.png" 
                    alt="Industrial Partnership" 
                    fill
                    className="object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1F2C] via-transparent to-transparent" />
               </div>
               {/* Decorative Overlay */}
               <div className="absolute inset-0 border-[20px] border-[#FF6600]/10 rounded-[60px] -m-4 pointer-events-none" />
            </div>
            
            <div className="lg:w-1/2 space-y-12">
              <div className="space-y-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-black uppercase tracking-[0.3em]">
                  Ecosystem Growth
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                  Partner With <br /> <span className="text-[#FF6600]">Europack.</span>
                </h2>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                  We are expanding our pan-India network of vendors, field contractors, and logistics consultants. Grow your business with our signature industrial projects.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: Truck, title: 'Logistics Partners', desc: 'Join our transportation fleet network.' },
                  { icon: Briefcase, title: 'Channel Sales', desc: 'Represent our solutions in new markets.' },
                  { icon: Users, title: 'Service Contractors', desc: 'Execute on-site lashing & packing.' },
                  { icon: Globe, title: 'Global Vendors', desc: 'Supply certified raw materials.' },
                ].map((p, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF6600] shrink-0 group-hover:bg-[#FF6600] group-hover:text-white transition-all">
                      <p.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-black text-lg mb-1 tracking-tight">{p.title}</h4>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setIsPartnerModalOpen(true)}
                className="flex items-center gap-4 px-10 py-5 bg-[#FF6600] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#E65C00] transition-all shadow-xl shadow-orange-500/20"
              >
                Become a Partner <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TRAINING & GROWTH SECTION */}
      <section className="py-24 bg-white">
        <div className="container max-w-[90rem] mx-auto px-6">
          <SectionHeader 
            tag="Skill Ascent"
            title="Learn. Grow. Lead."
            desc="Continuous learning is built into our operational DNA. We invest in certification and engineering mastery."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'On-Site Training', icon: Award, desc: 'Mentor-led field training for lashing & securing.' },
              { title: 'Safety Certification', icon: CheckCircle2, desc: 'International standard safety protocols (ISPM/EPAL).' },
              { title: 'Packaging Engineering', icon: Briefcase, desc: 'Structural analysis and CAD-led design learning.' },
              { title: 'Export Compliance', icon: Globe, desc: 'Mastery of global maritime export law and regulations.' },
            ].map((t, i) => (
              <div key={i} className="p-10 rounded-[40px] border border-slate-50 bg-slate-50/50 hover:bg-white hover:shadow-2xl transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#FF6600] mb-8 shadow-sm group-hover:scale-110 transition-transform">
                  <t.icon size={24} />
                </div>
                <h4 className="text-xl font-black text-[#1A1F2C] mb-4 tracking-tight">{t.title}</h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10, 11, 12 to follow... */}
      {/* 10. TESTIMONIALS SECTION */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-20 left-20 opacity-[0.03] text-[#1A1F2C]">
           <Quote size={200} />
        </div>
        <div className="container max-w-[90rem] mx-auto px-6 relative z-10">
          <SectionHeader 
            tag="Employee Voices"
            title="Life at the Center of Gravity."
            desc="Our people are our most valuable asset. Hear directly from the team that powers Europack."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Amit Sharma', role: 'Senior Packaging Engineer', text: 'Working on ODC projects for the energy sector has been the highlight of my career. The technical precision required here is world-class.', stars: 5 },
              { name: 'Priya Verma', role: 'Logistics Coordinator', text: 'Europack offers a truly dynamic environment. From day one, I was managing on-site lashing projects that required real-time problem solving.', stars: 5 },
              { name: 'Rahul Nair', role: 'Quality Inspector', text: 'The focus on international standards like ISPM-15 ensures we are always learning. It\'s more than just packing; it\'s engineering.', stars: 5 },
            ].map((rev, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[48px] border border-white shadow-xl relative group">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-[#FF6600] text-white flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                   <Quote size={20} fill="currentColor" />
                </div>
                <div className="space-y-6">
                   <div className="flex gap-1">
                      {[...Array(rev.stars)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-400" />)}
                   </div>
                   <p className="text-lg font-black text-[#1A1F2C] leading-relaxed italic">"{rev.text}"</p>
                   <div>
                      <p className="font-black text-sm text-[#1A1F2C]">{rev.name}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{rev.role}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section className="py-24 bg-white">
        <div className="container max-w-[90rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-8">
               <span className="section-tag">Career Clarity</span>
               <h2 className="section-head">Career FAQ <br />Matrix.</h2>
               <p className="section-desc">Immediate answers for aspiring industrial professionals. We value transparency in our selection process.</p>
               
               <div className="p-8 rounded-[40px] bg-[#1A1F2C] text-white space-y-6">
                  <h4 className="text-xl font-black">Still have questions?</h4>
                  <p className="text-slate-400 text-sm font-medium">Our HR team is ready to guide your application process.</p>
                  <button className="flex items-center gap-3 text-[#FF6600] font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors">
                     Connect with HR <ArrowRight size={16} />
                  </button>
               </div>
            </div>

            <div className="space-y-4">
               {[
                 { q: 'Who can apply to Europack?', a: 'We seek professionals with a background in Mechanical Engineering, Logistics, Supply Chain, and Industrial Design. Passion for precision is a must.' },
                 { q: 'Do you hire freshers?', a: 'Yes, we have a specialized Graduate Engineer Trainee (GET) program for fresh graduates looking to enter the world of industrial packaging.' },
                 { q: 'Is on-site training provided?', a: 'Absolutely. Every new joiner undergoes a mandatory 4-week field training program led by our senior logistics architects.' },
                 { q: 'Do you offer relocation assistance?', a: 'Relocation support is provided for critical engineering and operations roles based on project requirements.' },
                 { q: 'How fast is the hiring process?', a: 'Typically, we move from application to offer within 14-21 business days.' },
               ].map((faq, idx) => (
                 <div key={idx} className={`border border-slate-50 rounded-[32px] overflow-hidden transition-all ${faqOpenIdx === idx ? 'bg-white shadow-xl' : 'bg-slate-50/50'}`}>
                    <button 
                      onClick={() => setFaqOpenIdx(faqOpenIdx === idx ? null : idx)}
                      className="w-full p-8 flex items-center justify-between text-left group"
                    >
                       <span className={`text-sm font-black transition-colors ${faqOpenIdx === idx ? 'text-[#FF6600]' : 'text-[#1A1F2C]'}`}>{faq.q}</span>
                       <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${faqOpenIdx === idx ? 'bg-[#FF6600] border-[#FF6600] text-white rotate-45' : 'bg-white border-slate-200 text-slate-400 group-hover:text-[#FF6600]'}`}>
                          <Plus size={16} />
                       </div>
                    </button>
                    <AnimatePresence>
                      {faqOpenIdx === idx && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-8 pb-8"
                        >
                           <p className="text-slate-500 text-sm font-medium leading-relaxed pt-2 border-t border-slate-50">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>


      {/* MODALS */}
      <JobApplyModal 
        isOpen={isApplyModalOpen} 
        onClose={() => setIsApplyModalOpen(false)} 
        jobTitle={selectedJob}
      />
      <PartnerModal 
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
      />
    </div>
  );
}

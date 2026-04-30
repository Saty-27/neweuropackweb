'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowRight, Share2, MessageSquare, ChevronRight } from 'lucide-react';
import BlogBlockRenderer from '../../../../components/public/BlogBlockRenderer';
import { fetchAPI } from '../../../../lib/api';
import { useModal } from '../../../../context/ModalContext';

interface Blog {
  _id: string;
  title: string;
  subtitle: string;
  slug: string;
  heroImage: string;
  altText: string;
  category: string;
  author: string;
  status: string;
  createdAt: string;
  typography: {
    title: { fontSize: string; fontWeight: string; fontFamily: string; color: string };
    subtitle: { fontSize: string; fontWeight: string; fontFamily: string; color: string };
    paragraph: { fontSize: string; lineHeight: string; fontFamily: string; color: string };
  };
  contentBlocks: any[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    schema?: any;
    faqs?: { question: string; answer: string }[];
  };
  analytics: {
    views: number;
    readTime: number;
  };
}

export default function BlogDetailClient({ blog }: { blog: Blog }) {
  const { openEnquiryModal } = useModal();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [recommended, setRecommended] = useState<Blog[]>([]);

  // Font Loader & Scroll Tracker
  useEffect(() => {
    // 1. Load Fonts
    const families = [
       blog.typography.title.fontFamily, 
       blog.typography.subtitle.fontFamily, 
       blog.typography.paragraph.fontFamily
    ];
    const uniqueFamilies = Array.from(new Set(families));
    const linkId = 'blog-fonts-public';
    let link = document.getElementById(linkId) as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    const fontStr = uniqueFamilies.map(f => `family=${f.replace(/ /g, '+')}:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900`).join('&');
    link.href = `https://fonts.googleapis.com/css2?${fontStr}&display=swap`;

    // 2. Track Scroll Progress
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);

    // 3. Load Recommended
    loadRecommended();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [blog]);

  const loadRecommended = async () => {
    try {
      // Skip API call for mock data — mock IDs are not valid MongoDB ObjectIds
      const isValidObjectId = blog._id && /^[a-f\d]{24}$/i.test(blog._id);
      if (!isValidObjectId) return;
      const res = await fetchAPI(`/blogs/recommended?currentBlogId=${blog._id}&category=${blog.category}`);
      if (res.success) setRecommended(res.blogs);
    } catch (e) {
      console.error('Failed to load recommended stories', e);
    }
  };

  const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('/')) return path;
    return `http://localhost:5002/${path}`;
  };

  // Automated JSON-LD BlogPosting Schema
  const jsonLd = blog.seo?.schema || {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": [getImageUrl(blog.heroImage)],
    "datePublished": blog.createdAt,
    "author": [{
       "@type": "Person",
       "name": blog.author,
       "url": "https://europackindia.in"
    }],
    "description": blog.seo?.metaDescription || blog.subtitle,
    "publisher": {
       "@type": "Organization",
       "name": "Europack",
       "logo": {
         "@type": "ImageObject",
         "url": "https://europackindia.in/logo.png"
       }
    }
  };

  return (
    <div className="bg-white min-h-screen selection:bg-orange-100 selection:text-[#FF6600]">
       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
       
       {/* Reading Progress Indicator */}
       <div className="fixed top-0 left-0 h-1.5 bg-[#FF6600] z-[100] transition-all duration-100" style={{ width: `${scrollProgress}%` }} />

       <div className="max-w-7xl mx-auto px-6 pt-32 pb-12">
          {/* Breadcrumbs */}
          <motion.nav 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-[10px] font-black text-slate-400 mb-16 tracking-widest uppercase no-scrollbar overflow-x-auto"
          >
             <Link href="/" className="hover:text-[#FF6600] no-underline">HOME</Link>
             <ChevronRight size={14} className="text-slate-300" />
             <Link href="/blog" className="hover:text-[#FF6600] no-underline">BLOG</Link>
             <ChevronRight size={14} className="text-slate-300" />
             <span className="text-[#FF6600]">{blog.category}</span>
          </motion.nav>

          <article>
             <header className="max-w-4xl mx-auto mb-20 text-center lg:text-left">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-3 px-5 py-2 bg-slate-50 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-slate-100/50"
                >
                   <Tag size={12} className="text-[#FF6600]" /> {blog.category}
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ 
                    fontFamily: blog.typography.title.fontFamily,
                    fontSize: blog.typography.title.fontSize,
                    fontWeight: blog.typography.title.fontWeight,
                    color: blog.typography.title.color,
                    lineHeight: 1.1,
                    letterSpacing: '-3px'
                  }}
                  className="mb-8 tracking-tighter"
                >
                   {blog.title}
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                  style={{ 
                    fontFamily: blog.typography.subtitle.fontFamily,
                    fontSize: blog.typography.subtitle.fontSize,
                    fontWeight: blog.typography.subtitle.fontWeight,
                    color: blog.typography.subtitle.color
                  }}
                  className="mb-12 leading-relaxed"
                >
                   {blog.subtitle}
               </motion.p>

                {blog.heroImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="w-full aspect-[16/9] md:aspect-[21/9] relative rounded-[32px] overflow-hidden mb-16 shadow-2xl shadow-slate-200/50 border border-slate-100"
                  >
                    <img 
                      src={getImageUrl(blog.heroImage)} 
                      alt={blog.altText || blog.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}

             </header>


             {/* Dynamic Blog Content - Architectural Canvas Container */}
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="max-w-5xl mx-auto pb-48 px-10 md:px-20 py-24 bg-white border border-slate-100 rounded-[64px] shadow-2xl shadow-slate-200/50 mb-48 relative"
             >
                <div className="absolute -left-12 top-0 h-full hidden lg:flex flex-col items-center gap-8 py-24">
                   <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-slate-100 to-transparent" />
                   <div className="rotate-90 origin-center whitespace-nowrap text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">TECHNICAL BLUEPRINT 01</div>
                </div>
                <BlogBlockRenderer blocks={blog.contentBlocks} defaultTypography={blog.typography} />
             </motion.div>
          </article>

          {/* Recommended Feed */}
          {recommended.length > 0 && (
             <motion.section 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="pt-24 border-t border-slate-100"
             >
                <div className="flex justify-between items-end mb-16">
                   <div>
                      <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2 uppercase">Deep Architecture</h2>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recommended reading based on this blueprint</p>
                   </div>
                   <Link href="/blog" className="text-[#FF6600] font-black uppercase tracking-widest text-[10px] no-underline flex items-center gap-2 group">
                      View Journal <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                   </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                   {recommended.map((r, i) => (
                      <motion.div
                        key={r._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Link href={`/blog/${r.slug}`} className="group no-underline block">
                           <div className="aspect-[4/3] rounded-[32px] overflow-hidden mb-6 border border-slate-100 group-hover:shadow-2xl group-hover:shadow-slate-200 transition-all duration-700">
                              <img src={getImageUrl(r.heroImage)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={r.title} />
                           </div>
                           <span className="text-[9px] font-black text-[#FF6600] uppercase tracking-widest mb-3 block">{r.category}</span>
                           <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-[#FF6600] transition-colors line-clamp-2 uppercase tracking-tight">{r.title}</h3>
                        </Link>
                      </motion.div>
                   ))}
                </div>
             </motion.section>
          )}

          {/* Lead Magnet CTA */}
          <motion.section 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-48 bg-[#1A1F2C] rounded-[64px] p-16 md:p-32 text-center relative overflow-hidden group"
          >
             {/* Dynamic Orbs */}
             <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF6600]/10 rounded-full blur-[100px] -ml-48 -mt-48 group-hover:scale-150 transition-transform duration-1000" />
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] -mr-48 -mb-48" />
             
             <div className="relative z-20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-[10px] font-black uppercase tracking-widest mb-12"
                >
                   Strategic Partnership
                </motion.div>
                <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-8 max-w-4xl mx-auto leading-[0.9] uppercase">
                   Ready to optimize your <span className="text-[#FF6600]">export architecture?</span>
                </h2>
                <p className="text-lg md:text-xl text-slate-400 font-bold mb-16 max-w-2xl mx-auto leading-relaxed uppercase tracking-tight">
                   Get a customized blueprint and performance quote from our engineering experts today.
                </p>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                   <motion.button 
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={openEnquiryModal} 
                     className="px-16 py-7 bg-[#FF6600] text-white rounded-[24px] font-black uppercase tracking-widest text-sm transition-all shadow-2xl shadow-orange-950/20 hover:shadow-orange-500/40 no-underline"
                   >
                      Engage Experts
                   </motion.button>
                   <motion.button 
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={openEnquiryModal} 
                     className="px-16 py-7 bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-[24px] font-black uppercase tracking-widest text-sm hover:bg-white/10 no-underline"
                   >
                      Get Fast Quote
                   </motion.button>
                </div>
             </div>
          </motion.section>
       </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';

// Components
import SubPageHero from '@/components/shared/SubPageHero';
import BlogFilters from '@/components/blog/BlogFilters';
import BlogFeatured from '@/components/blog/BlogFeatured';
import BlogTrending from '@/components/blog/BlogTrending';
import BlogStats from '@/components/blog/BlogStats';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogQuickGuides from '@/components/blog/BlogQuickGuides';
import BlogVideos from '@/components/blog/BlogVideos';
import BlogCaseStudies from '@/components/blog/BlogCaseStudies';
import BlogProductLinks from '@/components/blog/BlogProductLinks';
import BlogTrust from '@/components/blog/BlogTrust';
import BlogFAQ from '@/components/blog/BlogFAQ';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import BlogFinalCTA from '@/components/blog/BlogFinalCTA';
import blogIndex from '@/constants/blogIndex.json';

const featuredPost = {
  title: 'Wooden Pallet Manufacturer in Mumbai – Types, Prices & Export Guide (2025)',
  excerpt: 'Complete buying guide for wooden pallets in Mumbai. Compare types, prices, ISPM-15 certification, and find the best manufacturer for your industrial needs. Serving Fortune 500 clients since 1993.',
  category: 'Wooden Pallets',
  author: 'Europack',
  date: 'Apr 28, 2025',
  readTime: '12 min read',
  img: '/images/blog/wooden-pallets.png',
  slug: 'wooden-pallet-manufacturer-mumbai'
};

// Generate allPosts from the SEO blog system
const allPosts = blogIndex.map((blog: any) => {
  let img = '/images/blog/mumbai-packaging.png'; // Premium default
  if (blog.product === 'Wooden Pallets') img = '/images/blog/wooden-pallets.png';
  if (blog.product === 'Seaworthy Packing') img = '/images/blog/seaworthy-packing.png';
  if (blog.product === 'Wooden Boxes') img = '/images/blog/wooden-crates.png';
  if (blog.product === 'Shrink Wrapping') img = '/images/blog/shrink-wrapping.png';
  if (blog.product === 'Corrugated Boxes') img = '/images/blog/corrugated-boxes.png';

  return {
    title: blog.title,
    category: blog.product,
    author: 'Europack Technical Team',
    date: 'Oct 24, 2024',
    readTime: '12 min read',
    img: img,
    slug: blog.slug,
  };
});

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All Blogs');
  const [visibleCount, setVisibleCount] = useState(24);

  const filteredPosts = activeCategory === 'All Blogs' 
    ? allPosts 
    : allPosts.filter((p: any) => p.category === activeCategory);

  const postsToShow = filteredPosts.slice(0, visibleCount);

  return (
    <main className="bg-white">
      {/* 1. Hero Section */}
      <SubPageHero 
        badge="FAQ"
        title="Technical Insights"
        subtitle="The global authority on industrial packaging compliance, structural lashing engineering, and export safety protocols. Empowering logistics leaders since 1993."
        bgImage="/images/banners/banner_main.png"
      />

      {/* 3. Category Filter Bar (Sticky) */}
      <BlogFilters 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />

      {/* 4. Featured Article (Premium) */}
      <BlogFeatured post={featuredPost} />

      {/* 5. Trending Articles Strip */}
      <BlogTrending />

      {/* 6. Industry Insights Dashboard (Stats) */}
      <BlogStats />

      {/* 7. FAQ Grid (Main Articles) */}
      <BlogGrid posts={postsToShow} />

      {/* Pagination Load More */}
      {visibleCount < filteredPosts.length && (
        <div className="flex justify-center pb-20 bg-white">
          <button 
            onClick={() => setVisibleCount(v => v + 24)}
            className="px-10 py-4 bg-[#1A1F2C] text-white rounded-xl font-black text-xs tracking-widest uppercase hover:bg-[#ff6a00] hover:shadow-[0_20px_40px_-10px_rgba(255,106,0,0.4)] transition-all duration-300"
          >
            Load More Articles ({filteredPosts.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* 8. Quick Guides Section */}
      <BlogQuickGuides />

      {/* 9. Video Insights */}
      <BlogVideos />

      {/* 14. Trust / Client Proof (Integrated here for trust building before Case Studies) */}
      <BlogTrust />

      {/* 10. Case Studies Section */}
      <BlogCaseStudies />

      {/* 11. Product-Based Articles (Direct Lead Gen) */}
      <BlogProductLinks />

      {/* 15. FAQ (Blog Related) */}
      <BlogFAQ />

      {/* 12. Newsletter (Upgraded) */}
      <BlogNewsletter />

      {/* 17. Final CTA */}
      <BlogFinalCTA />

    </main>
  );
}

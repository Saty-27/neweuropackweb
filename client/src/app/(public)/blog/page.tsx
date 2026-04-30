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
import { getAllMockBlogs } from '@/data/allBlogs';

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

// Generate allPosts from the 50-blog system
const allPosts = getAllMockBlogs().map(blog => ({
  title: blog.title,
  category: blog.category,
  author: blog.author,
  date: new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  readTime: `${blog.analytics.readTime} min read`,
  img: blog.heroImage,
  slug: blog.slug,
}));

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All Blog');

  const filteredPosts = activeCategory === 'All Blog' 
    ? allPosts 
    : allPosts.filter(p => p.category === activeCategory);

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
      <BlogGrid posts={filteredPosts} />

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

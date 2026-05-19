import { fetchAPI } from '../../../../lib/api';
import { getMockBlogBySlug } from '../../../../data/allBlogs';
import BlogDetailClient from './BlogDetailClient';
import BlogComingSoonClient from './BlogComingSoonClient';
import { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { generateSeoBlogContent } from '../../../../lib/seoBlogGenerator';
import SeoArticleClient from './SeoArticleClient';

async function getBlog(slug: string) {
  // Priority 1: Check Mock Data for high-fidelity content (50 SEO blogs)
  const mockBlog = getMockBlogBySlug(slug);
  if (mockBlog) return mockBlog;

  try {
    const res = await fetchAPI(`/blogs/${slug}`, { cache: 'no-store' });
    if (res.success) return res.blog;
    return null;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  // 1. Check if it's an auto-generated SEO blog
  const seoContent = generateSeoBlogContent(slug);
  if (seoContent) {
    return {
      title: seoContent.meta.title,
      description: seoContent.meta.description,
      keywords: seoContent.meta.keywords,
      openGraph: {
        title: seoContent.meta.title,
        description: seoContent.meta.description,
        images: [seoContent.hero.image],
      },
      alternates: {
        canonical: `https://europack.in/blog/${slug}`,
      }
    };
  }

  // 2. Fallback to existing blog logic
  const blog = await getBlog(slug);
  if (!blog) return { title: 'Blog Not Found | Europack' };

  return {
    title: blog.seo?.metaTitle || `${blog.title} | Europack Blog`,
    description: blog.seo?.metaDescription || blog.subtitle,
    keywords: blog.seo?.keywords?.join(', '),
    openGraph: {
      title: blog.title,
      description: blog.subtitle,
      images: [blog.heroImage]
    }
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Check if it's an auto-generated SEO blog
  const seoContent = generateSeoBlogContent(slug);
  if (seoContent) {
    return <SeoArticleClient content={seoContent} slug={slug} />;
  }

  // 2. Fallback to existing blog logic
  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <div className="min-h-screen pt-32 bg-white">
        <div className="container max-w-4xl mx-auto px-6 text-center">
           <div className="w-24 h-24 bg-orange-100 rounded-3xl flex items-center justify-center mx-auto text-[#FF6600] mb-12">
              <Sparkles size={48} strokeWidth={2.5} />
           </div>
           <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter uppercase">Drafting in Progress.</h1>
           <p className="text-xl text-slate-500 font-bold mb-12 leading-relaxed">
             Our subject matter experts are currently codifying this specific technical blueprint. 
             Sign up to be the first to read it when it launches.
           </p>
           {/* Reusing the Coming Soon Client Logic */}
           <BlogComingSoonClient />
        </div>
      </div>
    );
  }

  return <BlogDetailClient blog={blog} />;
}

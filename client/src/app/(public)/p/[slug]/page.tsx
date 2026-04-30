'use client';

import React, { useState, useEffect, use } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function CustomCMSPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/pages/slug/${slug}`)
      .then(res => res.json())
      .then(json => {
        if (json.success) setPage(json.data);
      })
      .catch(err => console.error('Page fetch error:', err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!page) return <div className="min-h-screen flex items-center justify-center text-2xl font-bold">404 - Page Not Found</div>;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-black text-gray-900 mb-8 border-b-8 border-orange-500 inline-block pb-2">
            {page.title}
          </h1>
          <div 
            className="prose prose-lg max-w-none prose-orange text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

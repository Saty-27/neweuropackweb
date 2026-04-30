import React from 'react';
import { Metadata } from 'next';
import ServicePageClient from './ServicePageClient';

async function getServiceData(slug: string) {
  const res = await fetch(`http://localhost:5002/api/services/${slug}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.success ? json.data : null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = await getServiceData(params.slug);
  if (!service) return { title: 'Service Not Found | Europack' };

  return {
    title: service.seo?.metaTitle || `${service.title} | Europack`,
    description: service.seo?.metaDescription || `Expert industrial packaging services for ${service.title}. Export-ready solutions.`,
    keywords: service.seo?.keywords?.join(', ') || 'industrial packaging, wooden pallets, europack'
  };
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = await getServiceData(params.slug);
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center p-12 bg-slate-50">
         <div className="text-center">
            <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Service Profile Offline</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">The requested architectural guide could not be located</p>
            <a href="/" className="px-8 py-4 bg-[#FF6600] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-orange-100">Return to Portal</a>
         </div>
      </div>
    );
  }

  return <ServicePageClient service={service} />;
}

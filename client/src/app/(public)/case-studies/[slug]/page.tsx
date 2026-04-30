import { Metadata } from 'next';
import { fetchAPI } from '../../../../lib/api';
import CaseStudyDetailClient from './CaseStudyDetailClient';
import { notFound } from 'next/navigation';

async function getCaseStudy(slug: string) {
  try {
    const res = await fetchAPI(`/case-studies/artifact/${slug}`, { next: { revalidate: 3600 } });
    if (res.success) return res.data;
    return null;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const item = await getCaseStudy(params.slug);
  if (!item) return { title: 'Case Study Not Found | Europack' };

  return {
    title: item.seo?.metaTitle || `${item.title} | Case Study | Europack`,
    description: item.seo?.metaDescription || item.subtitle,
    keywords: item.seo?.keywords || [],
    openGraph: {
      title: item.seo?.metaTitle || item.title,
      description: item.seo?.metaDescription || item.subtitle,
      images: item.heroVideo?.thumbnail ? [item.heroVideo.thumbnail] : [],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const item = await getCaseStudy(params.slug);
  
  if (!item) notFound();

  return <CaseStudyDetailClient item={item} />;
}

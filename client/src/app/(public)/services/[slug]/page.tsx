import React from 'react';
import { servicesData } from '../../../../data/servicesData';
import ServiceDetailClient from './ServiceDetailClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = servicesData.find(s => s.slug === params.slug);
  if (!service) return { title: 'Service Not Found' };
  
  return {
    title: `${service.name} | Europack Industrial Services`,
    description: service.shortDesc,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = servicesData.find(s => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}

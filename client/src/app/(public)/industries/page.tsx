import React from 'react';
import type { Metadata } from 'next';
import IndustriesClient from './IndustriesClient';

export const metadata: Metadata = {
  title: 'Industries We Serve | Europack - Heavy Engineering, Pharma, Auto & More',
  description: 'Europack serves Heavy Engineering, Pharmaceutical, Automotive, FMCG, Defence, Energy, IT, and Chemical industries with tailored industrial packaging.',
};

export default function IndustriesPage() {
  return <IndustriesClient />;
}

import React from 'react';
import type { Metadata } from 'next';
import CaseStudiesClient from './CaseStudiesClient';

export const metadata: Metadata = {
  title: 'Engineering Case Studies | Europack Industrial Packaging',
  description: 'Explore our detailed engineering case studies across heavy machinery, automotive, pharmaceuticals, and defence sectors.',
};

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}

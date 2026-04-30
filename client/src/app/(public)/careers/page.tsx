import React from 'react';
import type { Metadata } from 'next';
import CareersClient from './CareersClient';

export const metadata: Metadata = {
  title: 'Careers | Europack - Join India\'s Leading Industrial Packaging Team',
  description: 'Build a career at Europack. Powering global logistics through precision packaging. Explore open roles in Engineering, Operations, and Sales across Mumbai and Pune.',
};

export default function CareersPage() {
  return <CareersClient />;
}

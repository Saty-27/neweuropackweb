import React from 'react';
import type { Metadata } from 'next';
import ClientsClient from './ClientsClient';

export const metadata: Metadata = {
  title: 'Customers & Testimonials | Europack - Trusted by 1000+ Industry Leaders',
  description: 'Europack is trusted by TATA, Siemens, L&T, Mahindra, and 1000+ manufacturers. Read customer testimonials from Heavy Engineering, Pharma, and Automotive sectors.',
};

export default function ClientsPage() {
  return <ClientsClient />;
}

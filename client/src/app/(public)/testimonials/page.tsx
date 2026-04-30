import React from 'react';
import type { Metadata } from 'next';
import TestimonialsClient from './TestimonialsClient';

export const metadata: Metadata = {
  title: 'Customer Testimonials & Reviews | Europack',
  description: 'Read reviews and testimonials from India\'s top manufacturing exporters, including TATA, Siemens, and L&T on Europack\'s industrial packaging reliability.',
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}

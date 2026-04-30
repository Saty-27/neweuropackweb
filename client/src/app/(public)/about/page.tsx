import React from 'react';
import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Europack | 33+ years of Industrial Packaging Excellence',
  description: 'Learn about Europack, India\'s trusted leader in ISPM-15 export wooden packaging, corrugated boxes, and comprehensive lashing solutions since 1993.',
};

export default function AboutPage() {
  return <AboutClient />;
}

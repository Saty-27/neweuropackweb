import React from 'react';
import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Industrial Packaging Services | Europack - Export Grade Protection',
  description: 'Pro-level industrial packaging services: crate packing, vacuum sealing, export lashing, and on-site engineering solutions for global logistics.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}

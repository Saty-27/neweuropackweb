import React from 'react';
import type { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Industrial Products Catalog | Europack - Master Supply Chain Solutions',
  description: 'Pro-grade industrial packaging catalog. Explore 23 categories and 130+ products including ISPM-15 wooden pallets, metal pallets, plastic pallets, and specialized engineering systems.',
};

export default function ProductsPage() {
  return <ProductsClient />;
}

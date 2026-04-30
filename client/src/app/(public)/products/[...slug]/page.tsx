import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Package } from 'lucide-react';
import { fetchAPI } from '../../../../lib/api';
import { productsData } from '../../../../constants/productsData';
import {
  findProductBySlug,
  generateProductContent,
  getAllProductSlugs,
} from '../../../../lib/productContentGenerator';
import ProductDetailClient from './ProductDetailClient';
import ProductSubDetailClient from './ProductSubDetailClient';

// ────────────────────────────────────────────────────
// CMS PRODUCT HELPERS (single-slug: /products/cms-slug)
// ────────────────────────────────────────────────────
async function getCmsProduct(slug: string) {
  try {
    const res = await fetchAPI(`/products/slug/${slug}`, { next: { revalidate: 0 } });
    return res.success ? res.data : null;
  } catch {
    return null;
  }
}

async function getAllCmsProducts() {
  try {
    const res = await fetchAPI('/products', { next: { revalidate: 0 } });
    return res.success ? res.data : [];
  } catch {
    return [];
  }
}

// ────────────────────────────────────────────────────
// STATIC PARAMS: all 130+ catalog products
// ────────────────────────────────────────────────────
export async function generateStaticParams() {
  return getAllProductSlugs(productsData).map(({ category, productSlug }) => ({
    slug: [category, productSlug],
  }));
}

// ────────────────────────────────────────────────────
// METADATA
// ────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug.length === 2) {
    // Catalog product: /products/[category]/[productSlug]
    const [category, productSlug] = slug;
    const result = findProductBySlug(category, productSlug, productsData);
    if (!result) return { title: 'Product Not Found | Europack' };
    const content = generateProductContent(result.product, result.category);
    return {
      title: content.metaTitle,
      description: content.metaDescription,
      keywords: content.keyFeatures.slice(0, 8).join(', '),
      openGraph: {
        title: content.metaTitle,
        description: content.metaDescription,
        images: [result.product.img].filter(Boolean),
        type: 'website',
      },
      twitter: { card: 'summary_large_image', title: content.metaTitle, description: content.metaDescription },
      alternates: { canonical: `/products/${category}/${productSlug}` },
    };
  }

  // CMS product: /products/[slug]
  const cmsSlug = slug[0];
  const product = await getCmsProduct(cmsSlug);
  if (!product) return { title: 'Product Not Found | Europack' };
  return {
    title: `${product.title} | Industrial Packaging | Europack`,
    description: product.description,
    keywords: product.features?.join(', '),
    openGraph: { title: product.title, description: product.description, images: [product.image].filter(Boolean) },
  };
}

// ────────────────────────────────────────────────────
// PAGE COMPONENT
// ────────────────────────────────────────────────────
export default async function ProductCatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  // ── TWO segments ─ catalog product ──────────────────
  if (slug.length === 2) {
    const [category, productSlug] = slug;
    const result = findProductBySlug(category, productSlug, productsData);

    if (!result) notFound();

    const { product, category: categoryData, subCategory } = result!;
    const content = generateProductContent(product, categoryData);
    const relatedProducts = categoryData.subCategories
      .flatMap((sub) => sub.products)
      .filter((p) => p.id !== product.id)
      .slice(0, 6);

    return (
      <ProductSubDetailClient
        product={product}
        category={categoryData}
        subCategory={subCategory}
        content={content}
        relatedProducts={relatedProducts}
      />
    );
  }

  // ── ONE segment ─ CMS product ─────────────────────
  if (slug.length === 1) {
    const cmsSlug = slug[0];
    const [product, allProducts] = await Promise.all([getCmsProduct(cmsSlug), getAllCmsProducts()]);
    if (!product) return <ProductNotFound />;
    return <ProductDetailClient product={product} allProducts={allProducts} />;
  }

  // Fallback
  notFound();
}

function ProductNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-12 text-center bg-slate-50 m-8 rounded-[60px]">
      <div className="w-24 h-24 bg-orange-100 rounded-3xl flex items-center justify-center text-[#FF6600] mx-auto mb-8">
        <Package size={48} />
      </div>
      <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Product Not Found</h2>
      <p className="text-slate-500 max-w-md mx-auto mb-10 font-medium">
        The product you are looking for might have been archived or moved to a different category.
      </p>
      <Link href="/products" className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#FF6600] transition-all no-underline">
        Browse All Products
      </Link>
    </div>
  );
}

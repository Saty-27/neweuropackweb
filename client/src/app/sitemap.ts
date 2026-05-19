import { MetadataRoute } from 'next'
import { fetchAPI } from '@/lib/api'
import marketplaceData from '@/constants/marketplaceData.json'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://europackindia.com' // Should be your production URL

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/products',
    '/blog',
    '/careers',
    '/contact',
    '/gallery',
    '/industries',
    '/company-facts'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Marketplace Products
  const marketplaceProductRoutes = marketplaceData.products.map(p => ({
    url: `${baseUrl}/products/${p.categoryId}/${p.id}`,
    lastModified: new Date(marketplaceData.lastUpdated),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Marketplace Locations
  const locationRoutes = marketplaceData.locations.map(l => ({
    url: `${baseUrl}/locations/${l.slug}`,
    lastModified: new Date(marketplaceData.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Marketplace Industries
  const industryRoutes = marketplaceData.industries.map(i => ({
    url: `${baseUrl}/industries/${i.slug}`,
    lastModified: new Date(marketplaceData.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Dynamic products (from CMS backend if any)
  let productRoutes: any[] = []
  try {
    const productsRes = await fetchAPI('/products')
    if (productsRes.success) {
      productRoutes = productsRes.data.map((p: any) => ({
        url: `${baseUrl}/products/${p.slug}`,
        lastModified: new Date(p.updatedAt || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    }
  } catch (e) {
    console.error('Sitemap: Failed to fetch products', e)
  }

  // Dynamic blogs
  let blogRoutes: any[] = []
  try {
    const blogsRes = await fetchAPI('/blogs?status=published')
    if (blogsRes.success) {
      blogRoutes = blogsRes.blogs.map((b: any) => ({
        url: `${baseUrl}/blog/${b.slug}`,
        lastModified: new Date(b.updatedAt || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    }
  } catch (e) {
    console.error('Sitemap: Failed to fetch blogs', e)
  }

  return [
    ...staticRoutes, 
    ...marketplaceProductRoutes,
    ...locationRoutes,
    ...industryRoutes,
    ...productRoutes, 
    ...blogRoutes
  ]
}

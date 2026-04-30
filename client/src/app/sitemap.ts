import { MetadataRoute } from 'next'
import { fetchAPI } from '@/lib/api'

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
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic products
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

  return [...staticRoutes, ...productRoutes, ...blogRoutes]
}

import { Metadata } from 'next';
import { fetchAPI } from '../../../lib/api';
import MediaClient from './MediaClient';

async function getMediaData() {
  try {
    const [itemsRes, settingsRes] = await Promise.all([
      fetchAPI('/media/items', { next: { revalidate: 3600 } }),
      fetchAPI('/media/settings', { next: { revalidate: 3600 } })
    ]);
    return {
      items: itemsRes.success ? itemsRes.data : [],
      settings: settingsRes.success ? settingsRes.data : null
    };
  } catch (error) {
    return { items: [], settings: null };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getMediaData();
  if (!settings?.seo) {
    return {
      title: 'Our Media & Resources | Europack India',
      description: 'Explore our mission-critical industrial packaging projects across global logistics hubs.',
    };
  }

  return {
    title: settings.seo.metaTitle,
    description: settings.seo.metaDescription,
    keywords: settings.seo.keywords || [],
    openGraph: {
      title: settings.seo.metaTitle,
      description: settings.seo.metaDescription,
    },
  };
}

export default async function ResourcesPage() {
  const { items, settings } = await getMediaData();

  return <MediaClient items={items} settings={settings} />;
}

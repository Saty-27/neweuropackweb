import GalleryClient from './GalleryClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industrial Packaging Gallery | Europack Engineering Portfolio',
  description: 'Explore our comprehensive gallery of industrial packaging solutions, including heavy-duty wooden crates, ISPM-15 pallets, vacuum packing, and lashing projects. Technical excellence in transit security.',
  keywords: 'industrial packaging gallery, wooden crates, vacuum packing, lashing and securing, Europack projects, technical packing solutions, India packaging exports',
  openGraph: {
    title: 'Europack Engineering Portfolio | Technical Packaging Gallery',
    description: 'Visual proof of our mission-critical industrial packaging and engineering capabilities across global logistics hubs.',
    images: ['/images/banners/2.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Europack Engineering Portfolio',
    description: 'Visual proof of our mission-critical industrial packaging capabilities.',
  }
};

async function getGalleryData() {
  try {
    const [itemsRes, settingsRes] = await Promise.all([
      fetch('http://localhost:5002/api/gallery/items', { next: { revalidate: 3600 } }),
      fetch('http://localhost:5002/api/gallery/settings', { next: { revalidate: 3600 } })
    ]);
    
    const items = await itemsRes.json();
    const settings = await settingsRes.json();
    
    return {
      items: items.success ? items.data : [],
      settings: settings.success ? settings.data : {}
    };
  } catch (error) {
    console.error('Failed to fetch gallery data:', error);
    return { items: [], settings: {} };
  }
}

export default async function GalleryPage() {
  const { items, settings } = await getGalleryData();
  
  return (
    <div className="bg-white">
      {/* Structural Data for SEO (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": "Europack Industrial Packaging Gallery",
            "description": "Gallery of industrial packaging, crating, and lashing projects.",
            "provider": {
              "@type": "Organization",
              "name": "Europack Packaging Solutions"
            }
          })
        }}
      />
      <GalleryClient items={items} settings={settings} />
    </div>
  );
}

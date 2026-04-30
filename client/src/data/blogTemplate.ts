// Blog template helper for consistent structure
export interface BlogEntry {
  _id: string;
  title: string;
  subtitle: string;
  slug: string;
  heroImage: string;
  altText: string;
  category: string;
  author: string;
  status: string;
  createdAt: string;
  typography: {
    title: { fontSize: string; fontWeight: string; fontFamily: string; color: string };
    subtitle: { fontSize: string; fontWeight: string; fontFamily: string; color: string };
    paragraph: { fontSize: string; lineHeight: string; fontFamily: string; color: string };
  };
  contentBlocks: any[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords?: string[];
    faqs?: { question: string; answer: string }[];
  };
  analytics: { views: number; readTime: number };
}

const defaultTypography = {
  title: { fontSize: '4rem', fontWeight: '900', fontFamily: 'Inter', color: '#1A1F2C' },
  subtitle: { fontSize: '1.25rem', fontWeight: '500', fontFamily: 'Inter', color: '#444' },
  paragraph: { fontSize: '1.1rem', lineHeight: '1.8', fontFamily: 'Inter', color: '#333' }
};

export function createBlog(
  id: string,
  slug: string,
  title: string,
  subtitle: string,
  heroImage: string,
  altText: string,
  category: string,
  contentBlocks: any[],
  seo: { metaTitle: string; metaDescription: string; keywords?: string[]; faqs?: { question: string; answer: string }[] },
  readTime: number = 10,
  views: number = 500
): BlogEntry {
  return {
    _id: id,
    title,
    subtitle,
    slug,
    heroImage,
    altText,
    category,
    author: 'Europack',
    status: 'published',
    createdAt: new Date().toISOString(),
    typography: defaultTypography,
    contentBlocks,
    seo,
    analytics: { views, readTime }
  };
}

// Shorthand block builders
export const h2 = (text: string) => ({ type: 'heading', content: { level: 'h2', text } });
export const h3 = (text: string) => ({ type: 'heading', content: { level: 'h3', text } });
export const p = (text: string) => ({ type: 'paragraph', content: { text } });
export const ul = (items: string[]) => ({ type: 'list', content: { items } });
export const img = (url: string, caption: string) => ({ type: 'image', content: { url, caption } });
export const cta = (text: string, link: string = '/contact') => ({ type: 'cta', content: { text, link } });
export const divider = () => ({ type: 'divider', content: {} });
export const link = (text: string, url: string) => ({ type: 'link', content: { text, url, newTab: false } });

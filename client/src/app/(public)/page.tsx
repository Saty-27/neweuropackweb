import { Metadata } from 'next';
import NewHomepageClient from './HomepageClient';
import StructuredData from '../../components/public/StructuredData';

export const metadata: Metadata = {
  title: "Europack | India's #1 Trusted Industrial Packaging Solutions",
  description: "Europack is India's trusted leader in ISPM-15 certified wooden crates, wooden pallets, corrugated boxes, dunnage bags, and precision industrial packaging. 33+ years, 1000+ customers.",
  keywords: ["wooden pallets", "corrugated boxes", "industrial packaging", "custom crates", "Europack", "export packaging", "ISPM-15", "dunnage bags"],
  openGraph: {
    title: "Europack | India's #1 Trusted Industrial Packaging Solutions",
    description: "India's trusted leader in ISPM-15 certified industrial packaging. 1000+ customers, 33+ years.",
    siteName: "Europack",
    type: "website"
  }
};

const orgData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Europack",
  "url": "https://europack.in",
  "logo": "https://europack.in/logo.png",
  "contactPoint": { "@type": "ContactPoint", "telephone": "+91-98190-30303", "contactType": "customer service" }
};

const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Europack",
  "url": "https://europack.in",
  "potentialAction": { "@type": "SearchAction", "target": "https://europack.in/products?q={search_term_string}", "query-input": "required name=search_term_string" }
};

export default function Home() {
  return (
    <>
      <StructuredData data={orgData} />
      <StructuredData data={websiteData} />
      <NewHomepageClient />
    </>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HomepageCMSLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const tabs = [
    { name: 'Global Section (Hero)', path: '/admin/cms/homepage/global-section' },
    { name: 'Welcome Section (Rules)', path: '/admin/cms/homepage/welcome' },
    { name: 'Banners (Responsive)', path: '/admin/cms/homepage/banners' },
    { name: 'Company Carousel', path: '/admin/cms/homepage/companies' },
    { name: 'Contact Us (Logic)', path: '/admin/cms/homepage/contact' },
    { name: 'Global SEO Config', path: '/admin/cms/homepage/seo' }
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0' }}>Homepage CMS Manager</h1>
        <p style={{ color: 'var(--admin-text-muted)', margin: 0 }}>Advanced unified editor to control strictly shaped homepage layouts.</p>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--admin-border)', background: '#F7FAFC' }}>
          {tabs.map(tab => {
            const isActive = pathname === tab.path;
            return (
              <Link key={tab.path} href={tab.path} style={{ textDecoration: 'none' }}>
                <div style={{ 
                  padding: '1rem 2rem', 
                  borderBottom: isActive ? '2px solid var(--admin-primary)' : '2px solid transparent', 
                  fontWeight: isActive ? 600 : 'normal', 
                  color: isActive ? 'var(--admin-primary)' : 'var(--admin-text-muted)', 
                  cursor: 'pointer' 
                }}>
                  {tab.name}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Dynamic CMS View */}
        <div style={{ padding: '2rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

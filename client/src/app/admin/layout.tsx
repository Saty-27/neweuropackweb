'use client';

import '../../styles/admin.css';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import { SocketProvider } from '../../components/admin/SocketProvider';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Removed metadata export as this is now a Client Component
// We should ideally move this to a route group layout or separate provider, but this works for simple protection

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthorized(true); // Login page doesn't need protection
      return;
    }

    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  if (!isAuthorized) {
    return null; // or a loading spinner
  }

  // If on login page, just render the login page without the sidebar/header
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <Header />
        <div className="admin-content">
          <SocketProvider>
            {children}
          </SocketProvider>
        </div>
      </main>
    </div>
  );
}

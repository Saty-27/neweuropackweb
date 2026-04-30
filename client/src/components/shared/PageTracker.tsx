'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { fetchAPI } from '@/lib/api';
import { v4 as uuidv4 } from 'uuid';

export default function PageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Skip tracking for admin pages
    if (pathname.startsWith('/admin')) return;

    const trackVisit = async () => {
      try {
        let sessionId = localStorage.getItem('visitor_session_id');
        if (!sessionId) {
          sessionId = uuidv4();
          localStorage.setItem('visitor_session_id', sessionId);
        }

        const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
        const referrer = document.referrer || 'Direct';

        await fetchAPI('/analytics/log', {
          method: 'POST',
          body: JSON.stringify({
            url,
            referrer,
            sessionId
          })
        });
      } catch (err) {
        // Silently fail to not disturb user
        console.error('Telemetry failed:', err);
      }
    };

    trackVisit();
  }, [pathname, searchParams]);

  return null;
}

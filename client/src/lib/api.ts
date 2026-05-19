export const API_URL = typeof window === 'undefined'
  ? (process.env.NODE_ENV === 'development' ? 'http://localhost:5002/api' : (process.env.NEXT_PUBLIC_API_URL || 'https://europackindia.com/api'))
  : (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:5002/api'
      : (process.env.NEXT_PUBLIC_API_URL || '/api'));

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('adminToken') || '';
  }

  const headers: Record<string, string> = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as Record<string, string>) || {}),
  };

  // Only set application/json if not sending FormData
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

  try {
    if (typeof window === 'undefined') {
      console.log(`[API Fetch] Building: ${API_URL}${endpoint}`);
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal
    });

    const contentType = res.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await res.json();
    } else {
      data = { error: await res.text() };
    }

    if (!res.ok) {
      const errorMessage = typeof data.error === 'object' 
        ? JSON.stringify(data.error) 
        : (data.error || `Server Error: ${res.status}`);
      throw new Error(errorMessage);
    }
    return data;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error(`[API Fetch] Timeout: ${API_URL}${endpoint}`);
      throw new Error('Request Timeout');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

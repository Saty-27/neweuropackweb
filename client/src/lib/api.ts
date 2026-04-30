export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api';

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

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
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
}

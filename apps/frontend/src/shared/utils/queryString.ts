export function appendQueryParams(url: string, params?: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0) return url;
  const query = new URLSearchParams(params).toString();
  return url + (url.includes('?') ? '&' : '?') + query;
}

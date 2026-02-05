const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export function buildApiUrl(endpoint: string): string {
  if (!endpoint || typeof endpoint !== 'string') {
    throw new Error('buildApiUrl: endpoint debe ser un string no vacío');
  }
  return endpoint.startsWith('http')
    ? endpoint
    : API_BASE_URL.replace(/\/$/, '') + '/' + endpoint.replace(/^\//, '');
}

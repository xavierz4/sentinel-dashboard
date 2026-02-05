
import { buildApiUrl } from '@shared/utils/url';
import { appendQueryParams } from '@shared/utils/queryString';
import { buildFetchOptions } from '@shared/utils/fetchOptions';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface ApiRequestOptions {
  method?: HttpMethod;
  body?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

export interface ApiRequestProps {
    endpoint: string;
    options?: ApiRequestOptions;
}

export async function apiRequest<T = any>(props: ApiRequestProps): Promise<T> {

  const { endpoint, options = {} } = props;
  const { method = HttpMethod.GET, body, params, headers = {} } = options;
  let finalUrl = appendQueryParams(buildApiUrl(endpoint), params);

  const fetchOptions: RequestInit = buildFetchOptions({ method, headers, body });

  const response = await fetch(finalUrl, fetchOptions);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Error en la petición');
  }
  
  // Si no hay contenido (ej: DELETE), retorna undefined
  if (response.status === 204) return undefined as T;
  return response.json();
}

import { HttpMethod } from "@root/core/apiClient";

interface BuildFetchOptionsProps {
  body?: any;
  method: HttpMethod;
  headers: Record<string, string>;
}

export function buildFetchOptions(props: BuildFetchOptionsProps): RequestInit {

  const { method, headers, body } = props;
  
  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }
  
  return fetchOptions;
}

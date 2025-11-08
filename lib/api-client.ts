import { getApiUrl } from './constants';
import type { BagistoResponse } from '@/types/bagisto';

interface ApiClientOptions {
  endpoint: string;
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

export async function apiClient<T>({ endpoint, method = 'GET', body, headers = {} }: ApiClientOptions): Promise<BagistoResponse<T>> {
  try {
    const url = getApiUrl(endpoint);
    console.log(`Making ${method} request to:`, url);

    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...headers
    };

    const config = {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
      mode: 'cors' as RequestMode,
      credentials: 'include' as RequestCredentials
    };

    console.log('Request config:', config);
    const response = await fetch(url, config);

    const data = await response.json();
    console.log('Response:', data);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Request failed',
        error: data
      };
    }

    return {
      success: true,
      message: data.message,
      data: data.data || data
    };

  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      error
    };
  }
}
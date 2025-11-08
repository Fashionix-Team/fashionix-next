// import hanya sekali
import { BAGISTO_API_URL } from "./constants";

// HTTP Methods yang didukung
type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// Interface untuk opsi request
interface FetchOptions {
  url: string;
  method?: Method;
  body?: any;
  headers?: Record<string, string>;
  contentType?: boolean;
}

// Interface untuk response API
interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  error?: {
    message: string;
    status?: number;
  } | null;
}

// Fungsi utama untuk request API
export async function fetchHandler<T = any>({
  url,
  method = "GET",
  body,
  headers = {},
  contentType = true,
}: FetchOptions): Promise<ApiResponse<T>> {
  const fullUrl = `${BAGISTO_API_URL}${url}`;

  const defaultHeaders: Record<string, string> = {
    Accept: "application/json",
    ...(contentType ? { "Content-Type": "application/json" } : {}),
    ...headers,
  };

  try {
    const response = await fetch(fullUrl, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: {
          message: data.message || "Request failed",
          status: response.status,
        },
      };
    }

    return {
      success: true,
      data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: {
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
    };
  }
}

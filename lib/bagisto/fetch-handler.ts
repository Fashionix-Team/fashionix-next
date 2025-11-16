// src/lib/bagisto/fetch-handler.ts

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchHandlerOptions<T = unknown> {
  url: string;               // endpoint dalam folder /api/...
  method?: Method;
  body?: T;
  headers?: Record<string, string>;
  contentType?: boolean;
}

export async function fetchHandler({
  url,
  method = "POST",
  body,
  headers = {},
  contentType = true,
}: FetchHandlerOptions) {
  try {
    const defaultHeaders: Record<string, string> = {
      ...(contentType ? { "Content-Type": "application/json" } : {}),
      ...headers,
    };

    const response = await fetch(`/api/${url}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    const json = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: {
          status: response.status,
          message: json?.error || "Something went wrong",
        },
      };
    }

    return json;
  } catch (err) {
    return {
      data: null,
      error: {
        message: err instanceof Error ? err.message : "Unknown error",
      },
    };
  }
}

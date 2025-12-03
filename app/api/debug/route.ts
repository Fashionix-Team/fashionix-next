import { NextResponse } from "next/server";
import { getHomeProductQuery } from "@/lib/bagisto/queries/common/product-collection";

export const dynamic = "force-dynamic";

export async function GET() {
  const bagistoDomain = process.env.BAGISTO_STORE_DOMAIN;
  const endpoint = `${bagistoDomain}/graphql`;
  
  let rawResponse = null;
  let error = null;
  
  try {
    // Test RAW fetch to see exactly what backend returns
    const filters = [
      { key: "limit", value: "8" },
      { key: "sort", value: "name-asc" },
    ];
    
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-locale": "en",
        "x-currency": "USD",
      },
      body: JSON.stringify({
        query: getHomeProductQuery,
        variables: { input: filters },
      }),
      cache: "no-store",
    });
    
    rawResponse = await res.json();
  } catch (e: any) {
    error = e?.message || String(e);
  }
  
  return NextResponse.json({
    env: {
      BAGISTO_STORE_DOMAIN: bagistoDomain || "NOT SET",
      endpoint: endpoint,
      NODE_ENV: process.env.NODE_ENV,
    },
    rawResponse,
    error,
    timestamp: new Date().toISOString(),
  });
}

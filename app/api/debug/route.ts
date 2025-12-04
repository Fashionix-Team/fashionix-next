import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const bagistoDomain = process.env.BAGISTO_STORE_DOMAIN;
  const endpoint = `${bagistoDomain}/graphql`;
  
  // Simple query without the complex getHomeProductQuery
  const simpleQuery = `
    query {
      allProducts(input: [{ key: "limit", value: "20" }]) {
        paginatorInfo { total count }
        data { id name }
      }
    }
  `;
  
  let result = null;
  let error = null;
  
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-locale": "id",
        "x-currency": "IDR",
        "Cache-Control": "no-cache, no-store",
        "Pragma": "no-cache",
      },
      body: JSON.stringify({ query: simpleQuery }),
      cache: "no-store",
    });
    
    result = await res.json();
  } catch (e: any) {
    error = e?.message || String(e);
  }
  
  return NextResponse.json({
    endpoint,
    result,
    error,
    timestamp: new Date().toISOString(),
  }, {
    headers: {
      "Cache-Control": "no-store",
    }
  });
}

import { NextResponse } from "next/server";
import { getHomeProductQuery } from "@/lib/bagisto/queries/common/product-collection";
import { getCollectionHomeProducts } from "@/lib/bagisto";

export const dynamic = "force-dynamic";

export async function GET() {
  const bagistoDomain = process.env.BAGISTO_STORE_DOMAIN;
  const endpoint = `${bagistoDomain}/graphql`;
  
  const filters = [
    { key: "limit", value: "8" },
    { key: "sort", value: "name-asc" },
  ];
  
  let rawFetchResult = null;
  let functionResult = null;
  let error = null;
  
  try {
    // Test 1: Raw fetch with exact same query
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-locale": "id",
        "x-currency": "IDR",
      },
      body: JSON.stringify({
        query: getHomeProductQuery,
        variables: { input: filters },
      }),
      cache: "no-store",
    });
    
    rawFetchResult = await res.json();
    
    // Test 2: Using the actual function
    functionResult = await getCollectionHomeProducts({
      filters,
      tag: "debug-test",
    });
  } catch (e: any) {
    error = e?.message || String(e);
  }
  
  return NextResponse.json({
    endpoint,
    rawFetch: {
      total: rawFetchResult?.data?.allProducts?.paginatorInfo?.total || 0,
      count: rawFetchResult?.data?.allProducts?.data?.length || 0,
      products: rawFetchResult?.data?.allProducts?.data?.map((p: any) => p.name) || [],
      errors: rawFetchResult?.errors || null,
    },
    functionResult: {
      count: functionResult?.length || 0,
      products: functionResult?.map((p: any) => p.name) || [],
    },
    error,
    timestamp: new Date().toISOString(),
  });
}

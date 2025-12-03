import { NextResponse } from "next/server";
import { getCollectionHomeProducts } from "@/lib/bagisto";

export const dynamic = "force-dynamic";

export async function GET() {
  const bagistoDomain = process.env.BAGISTO_STORE_DOMAIN;
  const endpoint = `${bagistoDomain}/graphql`;
  
  let testResult = null;
  let error = null;
  
  try {
    // Test direct fetch
    const filters = [
      { key: "limit", value: "8" },
      { key: "sort", value: "name-asc" },
    ];
    
    testResult = await getCollectionHomeProducts({
      filters,
      tag: "debug-test",
    });
  } catch (e: any) {
    error = e?.message || String(e);
  }
  
  return NextResponse.json({
    env: {
      BAGISTO_STORE_DOMAIN: bagistoDomain || "NOT SET",
      endpoint: endpoint,
      NODE_ENV: process.env.NODE_ENV,
    },
    testResult: {
      productsCount: testResult?.length || 0,
      products: testResult?.map((p: any) => ({ id: p.id, name: p.name })) || [],
    },
    error,
    timestamp: new Date().toISOString(),
  });
}

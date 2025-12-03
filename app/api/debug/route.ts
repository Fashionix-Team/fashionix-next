import { NextResponse } from "next/server";
import { getHomeProductQuery } from "@/lib/bagisto/queries/common/product-collection";

export const dynamic = "force-dynamic";

export async function GET() {
  const bagistoDomain = process.env.BAGISTO_STORE_DOMAIN;
  const endpoint = `${bagistoDomain}/graphql`;
  
  const results: Record<string, any> = {};
  
  // Test with different locale combinations
  const tests = [
    { locale: "en", currency: "USD", name: "en_USD" },
    { locale: "id", currency: "IDR", name: "id_IDR" },
    { locale: "en", currency: "IDR", name: "en_IDR" },
    { locale: "", currency: "", name: "no_headers" },
  ];
  
  const filters = [
    { key: "limit", value: "8" },
    { key: "sort", value: "name-asc" },
  ];
  
  for (const test of tests) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      
      if (test.locale) headers["x-locale"] = test.locale;
      if (test.currency) headers["x-currency"] = test.currency;
      
      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          query: getHomeProductQuery,
          variables: { input: filters },
        }),
        cache: "no-store",
      });
      
      const json = await res.json();
      results[test.name] = {
        total: json?.data?.allProducts?.paginatorInfo?.total || 0,
        count: json?.data?.allProducts?.data?.length || 0,
        products: json?.data?.allProducts?.data?.map((p: any) => p.name) || [],
        errors: json?.errors || null,
      };
    } catch (e: any) {
      results[test.name] = { error: e?.message };
    }
  }
  
  return NextResponse.json({
    env: {
      BAGISTO_STORE_DOMAIN: bagistoDomain,
      endpoint: endpoint,
    },
    results,
    timestamp: new Date().toISOString(),
  });
}

import { bagistoFetch } from "@/lib/bagisto";
import { getCollectionProductQuery } from "@/lib/bagisto/queries/collection";
import { TAGS } from "@/lib/constants";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle") || "arctic-cozy-knit-unisex-beanie";
  const type = searchParams.get("type") || "simple";

  try {
    console.log(`[TEST] Fetching product: ${handle}, type: ${type}`);
    
    // Test raw GraphQL query first
    const input = [
      { key: "url_key", value: handle },
      { key: "type", value: type },
      { key: "limit", value: "100" },
    ];

    const res = await bagistoFetch<any>({
      query: getCollectionProductQuery,
      tags: [TAGS.collections, TAGS.products],
      variables: { input },
      cache: "no-store",
    });

    console.log(`[TEST] Raw response:`, JSON.stringify(res.body, null, 2));

    return NextResponse.json({
      success: true,
      handle,
      type,
      input,
      response: res.body,
    });
  } catch (error) {
    console.error("[TEST] Error:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      handle,
      type,
    }, { status: 500 });
  }
}

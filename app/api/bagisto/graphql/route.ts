import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Prefer the canonical env var used across the repo, but fall back for compatibility
    const rawDomain = process.env.BAGISTO_STORE_DOMAIN || process.env.BAGISTO_URL || "";

    if (!rawDomain) {
      return NextResponse.json(
        { error: "BAGISTO_STORE_DOMAIN environment variable is not set." },
        { status: 500 }
      );
    }

    // Ensure we have a protocol. If missing, assume https.
    const domain = /^https?:\/\//i.test(rawDomain)
      ? rawDomain.replace(/\/$/, "")
      : `https://${rawDomain.replace(/\/$/, "")}`;

    const endpoint = `${domain}/graphql`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
      // Forward Bagisto error details when possible
      return NextResponse.json(
        { error: result?.error || result || "Bagisto returned an error" },
        { status: response.status }
      );
    }

    return NextResponse.json(result);
  } catch (err) {
    // Log the error for easier debugging in development
    // (server logs are available during `next dev` and in your hosting provider)
    // eslint-disable-next-line no-console
    console.error("/api/bagisto/graphql error:", err);

    return NextResponse.json(
      { error: "Tidak dapat menghubungi Bagisto. Periksa konfigurasi environment." },
      { status: 502 }
    );
  }
}

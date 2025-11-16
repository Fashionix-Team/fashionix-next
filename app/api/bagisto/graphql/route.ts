import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(`${process.env.BAGISTO_URL}/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: "Tidak dapat menghubungi Bagisto" },
      { status: 500 }
    );
  }
}

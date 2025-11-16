// src/app/api/rating/route.ts

import { NextResponse } from "next/server";
import { fetchHandler } from "@/lib/bagisto/fetch-handler";
import { CREATE_PRODUCT_REVIEW } from "@/lib/bagisto/mutations/product-review";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rating, feedback, productId } = body;

    // Validasi simple
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating harus 1–5" },
        { status: 400 }
      );
    }

    // Variables untuk GraphQL
    const variables = {
      rating,
      comment: feedback,
      title: `Rating ${rating} Bintang`,
      productId,
    };

    // Kirim ke Bagisto via /api/bagisto/graphql
    const result = await fetchHandler({
    url: "bagisto/graphql",  // TANPA "/" DI DEPAN
    method: "POST",
    body: {
      query: CREATE_PRODUCT_REVIEW,
      variables,
    },
  });


    // Cek error
    if (result?.error) {
      return NextResponse.json(
        { error: result.error.message || "Gagal membuat review" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Review berhasil dibuat",
      data: result.data ?? result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

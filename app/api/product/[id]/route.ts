import { NextRequest, NextResponse } from "next/server";
import { getCollectionReviewProducts } from "@/lib/bagisto";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productIdentifier } = await params;

    if (!productIdentifier) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Check if productIdentifier is numeric (id) or string (urlKey)
    const isNumericId = /^\d+$/.test(productIdentifier);
    
    console.log("Fetching product with identifier:", productIdentifier, "isNumericId:", isNumericId);

    // Fetch product details from Bagisto
    // getCollectionReviewProducts expects urlKey, not numeric id
    const product = await getCollectionReviewProducts({
      collection: productIdentifier,
      sortKey: "name",
      reverse: false,
      page: "product",
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: {
          product,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch product details",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

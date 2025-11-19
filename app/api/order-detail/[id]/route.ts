import { NextRequest, NextResponse } from "next/server";
import { getCustomerOrderDetail } from "@/lib/bagisto/helpers/order";

// Force this route to be dynamic
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const orderDetail = await getCustomerOrderDetail(id);

    if (!orderDetail) {
      return NextResponse.json(
        { error: "Pesanan tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: orderDetail }, { status: 200 });
  } catch (error) {
    console.error("Error fetching order detail:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Gagal memuat detail pesanan",
        details: error instanceof Error ? error.stack : undefined 
      },
      { status: 500 }
    );
  }
}

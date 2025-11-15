import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rating, feedback, productId } = body;

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating harus 1-5" },
        { status: 400 }
      );
    }

    // contoh: simpan sementara ke file log / console
    console.log("Rating masuk:", body);

    return NextResponse.json({
      message: "Ulasan berhasil diterima",
      data: body,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

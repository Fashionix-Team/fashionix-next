"use server";

import { getCustomerOrderDetail } from "@/lib/bagisto/helpers/order";
import { CustomerOrderDetail } from "@/lib/bagisto/types/order";
import { bagistoFetch } from "@/lib/bagisto";
import { createReviewMutation } from "@/lib/bagisto/mutations/review";

export async function fetchOrderDetail(
  orderId: string
): Promise<{ data: CustomerOrderDetail | null; error: string | null }> {
  try {
    const orderDetail = await getCustomerOrderDetail(orderId);

    if (!orderDetail) {
      return {
        data: null,
        error: "Pesanan tidak ditemukan",
      };
    }

    return {
      data: orderDetail,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching order detail:", error);
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "Gagal memuat detail pesanan",
    };
  }
}

interface CreateReviewInput {
  productId: string;
  rating: number;
  title: string;
  comment: string;
  name?: string;
}

export async function submitReview(
  input: CreateReviewInput
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await bagistoFetch<{
      data: {
        createReview: {
          success: boolean;
          message: string;
        };
      };
    }>({
      query: createReviewMutation,
      variables: {
        input: {
          productId: input.productId,
          rating: input.rating,
          title: input.title,
          comment: input.comment,
          name: input.name || undefined,
        },
      } as any,
      cache: "no-store",
    });

    return {
      success: response.body.data.createReview.success,
      message:
        response.body.data.createReview.message || "Ulasan berhasil dikirim",
    };
  } catch (error) {
    console.error("Error submitting review:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mengirim ulasan",
    };
  }
}

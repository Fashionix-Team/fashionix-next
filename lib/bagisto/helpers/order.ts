import { bagistoFetch } from "../index";
import { getCustomerOrdersListQuery } from "../queries/order";
import { GET_CUSTOMER_ORDER_DETAIL_QUERY } from "../queries/order-detail";
import {
  GetCustomerOrdersResponse,
  FilterCustomerOrderInput,
  GetCustomerOrderDetailResponse,
  CustomerOrderDetail,
} from "../types/order";

/**
 * Get customer orders list with pagination
 */
export async function getCustomerOrders(
  page: number = 1,
  limit: number = 10,
  input: FilterCustomerOrderInput = {}
): Promise<GetCustomerOrdersResponse["data"]["ordersList"]> {
  try {
    const res = await bagistoFetch<GetCustomerOrdersResponse>({
      query: getCustomerOrdersListQuery,
      variables: {
        first: limit,
        page: page,
        input: input,
      } as any,
      cache: "no-store",
    });

    return res.body.data.ordersList;
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    // Re-throw with more context
    throw new Error(
      `Gagal memuat riwayat pesanan. ${error instanceof Error ? error.message : 'Silakan coba lagi.'}`
    );
  }
}

/**
 * Get customer order detail by ID
 */
export async function getCustomerOrderDetail(
  id: string
): Promise<CustomerOrderDetail | null> {
  try {
    const res = await bagistoFetch<GetCustomerOrderDetailResponse>({
      query: GET_CUSTOMER_ORDER_DETAIL_QUERY,
      variables: { id } as any,
      cache: "no-store",
    });

    return res.body.data.orderDetail;
  } catch (error) {
    console.error("Error fetching order detail:", error);
    return null;
  }
}

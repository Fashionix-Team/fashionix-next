export interface CustomerOrder {
  id: string;
  incrementId: string | null;
  status: string | null;
  statusLabel: string | null;
  createdAt: string;
  grandTotal: number | null;
  formattedPrice: {
    grandTotal: string | null;
  } | null;
  totalQtyOrdered: number | null;
}

export interface PaginatorInfo {
  currentPage: number;
  lastPage: number;
  total: number;
}

export interface GetCustomerOrdersResponse {
  data: {
    ordersList: {
      data: CustomerOrder[];
      paginatorInfo: PaginatorInfo;
    };
  };
}

export interface FilterCustomerOrderInput {
  status?: string;
  // tambahkan properti filter lain jika ada
}

// Order Detail Types
export interface OrderAddress {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
  email: string;
}

export interface OrderItemProduct {
  name: string;
  sku: string;
  categories: {
    name: string;
  }[];
  images: {
    id: string;
    url: string;
  }[];
}

export interface OrderItem {
  id: string;
  name: string;
  sku: string;
  qtyOrdered: number;
  price: number;
  formattedPrice: {
    price: string;
    total: string;
  };
  product: OrderItemProduct;
}

export interface OrderComment {
  id: string;
  comment: string;
  createdAt: string;
}

export interface CustomerOrderDetail {
  id: string;
  incrementId: string;
  status: string;
  statusLabel: string;
  createdAt: string;
  grandTotal: number;
  formattedPrice: {
    grandTotal: string;
  };
  items: OrderItem[];
  billingAddress: OrderAddress;
  shippingAddress: OrderAddress;
  comments: OrderComment[];
}

export interface GetCustomerOrderDetailResponse {
  data: {
    orderDetail: CustomerOrderDetail;
  };
}

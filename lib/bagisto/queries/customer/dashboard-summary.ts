export const getDashboardSummaryQuery = /* GraphQL */ `
  query customerDashboardSummary($input: FilterCustomerOrderInput) {
    # Mengambil data dasar pelanggan
    accountInfo {
      wishlist {
        id
      }
      defaultAddress {
        address
      }
    }
    # Mengambil semua pesanan pelanggan dengan paginasi (ambil hingga 1000 pesanan)
    ordersList(first: 1000, input: $input) {
      data {
        id
        orderId: id
        date: createdAt
        status
        total: grandTotal
        productCount: totalQtyOrdered
      }
    }
  }
`;
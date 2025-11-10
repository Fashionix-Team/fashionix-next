export const getDashboardSummaryQuery = /* GraphQL */ `
  query customerDashboardSummary {
     customerDashboardSummary {
      totalOrders
      pendingOrders
      totalWishlist
      defaultAddress {
        address
      }
      latestOrders {
        id
        orderId: id
        date: createdAt
        status
        total: grandTotal
        link: id
        productCount: totalQtyOrdered
      }
    }
  }
`;
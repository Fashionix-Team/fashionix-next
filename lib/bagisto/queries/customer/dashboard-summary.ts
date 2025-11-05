export const getDashboardSummaryQuery = /* GraphQL */ `
  query customerDashboardSummary {
    customerDashboardSummary {
      totalOrders
      pendingOrders
      totalWishlist
      defaultAddress {
        address
      }
    }
  }
`;
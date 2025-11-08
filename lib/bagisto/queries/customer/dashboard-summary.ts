export const getDashboardSummaryQuery = /* GraphQL */ `
  query customerDashboardSummary {
    customer {
      id
      allOrders {
        data(input: { limit: 5, page: 1, sort: "id-desc" }) {
          id
          status
          grandTotal
          createdAt
          itemsCount
          incrementId
        }
      }
      wishlists {
        data {
          id
        }
      }
      addresses {
        data {
          address
        }
      }
    }
  }
`;
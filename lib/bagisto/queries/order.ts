export const getCustomerOrdersListQuery = /* GraphQL */ `
  query GetCustomerOrdersList(
    $first: Int!
    $page: Int
    $input: FilterCustomerOrderInput
  ) {
    ordersList(first: $first, page: $page, input: $input) {
      data {
        id
        incrementId
        status
        statusLabel
        createdAt
        grandTotal
        formattedPrice {
          grandTotal
        }
        totalQtyOrdered
      }
      paginatorInfo {
        currentPage
        lastPage
        total
      }
    }
  }
`;
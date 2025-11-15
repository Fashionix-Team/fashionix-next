export const GET_CUSTOMER_ORDERS_LIST_QUERY = /* GraphQL */ `
  query GetCustomerOrdersList(
    $first: Int!
    $page: Int
    $input: FilterCustomerOrderInput
  ) {
    ordersList(first: $first, page: $page, input: $input) {
      data {
        id
        incrementId # Hanya minta ID
      }
      paginatorInfo {
        currentPage
        lastPage
        total
      }
    }
  }
`;
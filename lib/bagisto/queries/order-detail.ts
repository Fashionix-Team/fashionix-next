export const GET_CUSTOMER_ORDER_DETAIL_QUERY = /* GraphQL */ `
  query GetCustomerOrderDetail($id: ID!) {
    # 'orderDetail' mengambil satu pesanan berdasarkan ID (source 4)
    orderDetail(id: $id) {
      # Info Dasar (source 72-74)
      id
      incrementId
      status
      statusLabel
      createdAt
      formattedPrice {
        grandTotal # (source 333)
      }

      # Alamat (source 74-75)
      billingAddress {
        # (source 330-332)
        firstName
        lastName
        address
        city
        state
        country
        postcode
        phone
        email
      }
      shippingAddress {
        # (source 330-332)
        firstName
        lastName
        address
        city
        state
        country
        postcode
        phone
        email
      }

      # Item Produk (source 74)
      items {
        # (source 78-83)
        id
        name
        qtyOrdered
        formattedPrice {
          price # Harga satuan (source 333)
          total # Subtotal (source 334)
        }
        product {
          # (source 135)
          id
          categories {
            # (source 136, 172)
            name
          }
          images {
            # (source 136, 168)
            id
            url
          }
        }
      }

      # Komentar Pesanan (untuk Order Activity) (source 75)
      comments {
        # (source 75-76)
        id
        comment
        createdAt
      }
    }
  }
`;
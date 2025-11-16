// src/lib/bagisto/mutations/product-review.ts

export const CREATE_PRODUCT_REVIEW = `
  mutation CreateProductReview(
    $productId: ID!,
    $rating: Float!,
    $title: String!,
    $comment: String!
  ) {
    createReview(
      input: {
        product_id: $productId,
        rating: $rating,
        title: $title,
        comment: $comment
      }
    ) {
      message
      status
    }
  }
`;

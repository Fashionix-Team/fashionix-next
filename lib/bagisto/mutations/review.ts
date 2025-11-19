// Create review mutation
export const createReviewMutation = /* GraphQL */ `
  mutation createReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      success
      message
      review {
        id
        name
        title
        rating
        comment
        status
        createdAt
        product {
          id
          name
        }
      }
    }
  }
`;

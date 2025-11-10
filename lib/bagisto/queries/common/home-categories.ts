export const getHomeCategoriesQuery = /* GraphQL */ `
  query HomeCategories(
    $getCategoryTree: Boolean
    $input: [FilterHomeCategoriesInput]
  ) {sjcjgkscjsj
    homeCategories(getCategoryTree: $getCategoryTree, input: $input) {
      id
      logoPath
      logoUrl
      name
      slug
      children {
        id
        logoPath
        logoUrl
        name
        slug
        children {
          id
          logoPath
          logoUrl
          name
          slug
        }
      }
    }
  }
`;

export const getProductDetailQuery = /* GraphQL */ `
  query ProductDetail($input: [FilterHomeCategoriesInput]) {
    allProducts(input: $input) {
      data {
        id
        sku
        type
        parentId
        attributeFamilyId
        productNumber
        name
        shortDescription
        description
        urlKey
        shareURL
        new
        featured
        status
        guestCheckout
        visibleIndividually
        metaTitle
        metaKeywords
        metaDescription
        price
        specialPrice
        specialPriceFrom
        specialPriceTo
        weight
        createdAt
        updatedAt
        isInWishlist
        isInSale
        isSaleable
        averageRating
        percentageRating
        priceHtml {
          id
          type
          html
          regularPrice
          finalPrice
          currencyCode
          bundlePrice {
            finalPriceFrom
            finalPriceTo
            regularPriceFrom
            regularPriceTo
            from {
              regular {
                price
                formattedPrice
              }
              final {
                price
                formattedPrice
              }
            }
            to {
              regular {
                price
                formattedPrice
              }
              final {
                price
                formattedPrice
              }
            }
          }
        }
        cacheGalleryImages {
          smallImageUrl
          mediumImageUrl
          largeImageUrl
          originalImageUrl
        }
        images {
          id
          url
          path
          productId
          type
        }
        inventories {
          id
          qty
          productId
          inventorySourceId
          vendorId
          inventorySourceName
        }
        reviews {
          id
          name
          title
          rating
          comment
          status
          productId
          customerId
          createdAt
          updatedAt
          customer {
            id
            firstName
            lastName
            name
            email
            image
            imageUrl
          }
          images {
            id
            reviewId
            type
            mimeType
            path
            url
          }
        }
        additionalData {
          id
          code
          label
          value
          admin_name
          type
        }
        variants {
          id
          sku
          name
          type
          price
          weight
          status
        }
        superAttributes {
          id
          code
          adminName
          type
          position
          isFilterable
          options {
            id
            adminName
            swatchValue
            sortOrder
            label
            products {
              id
              price
            }
          }
        }
        relatedProducts {
          id
          sku
          type
          name
          urlKey
          price
          specialPrice
          priceHtml {
            id
            type
            html
            regularPrice
            finalPrice
            currencyCode
          }
          cacheGalleryImages {
            smallImageUrl
            mediumImageUrl
            largeImageUrl
            originalImageUrl
          }
          images {
            id
            url
            path
            productId
            type
          }
        }
      }
    }
  }
`;

export const getCustomerAddressQuery = /* GraphQL */ `
  query CheckoutAddresses {
    checkoutAddresses {
      isGuest
      defaultCountry
      addresses {
        id
        address
      }
      customer {
        id
        firstName
        lastName
        name
        gender
        dateOfBirth
        email
        phone
        image
        imageUrl
        status
        password
        apiToken
        customerGroupId
        channelId
        subscribedToNewsLetter
        isVerified
        isSuspended
        token
        rememberToken
        createdAt
        updatedAt
        isWishlistShared
        getWishlistSharedLink
        defaultAddress {
          id
          addressType
          parentAddressId
          customerId
          cartId
          orderId
          firstName
          lastName
          gender
          companyName
          address
          city
          state
          stateName
          country
          countryName
          postcode
          email
          phone
          vatId
          defaultAddress
          useForShipping
          createdAt
          updatedAt
        }
        addresses {
          id
          addressType
          parentAddressId
          customerId
          cartId
          orderId
          firstName
          lastName
          gender
          companyName
          address
          city
          state
          stateName
          country
          countryName
          postcode
          email
          phone
          vatId
          defaultAddress
          useForShipping
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const getAccountInfoQuery = /* GraphQL */ `
  query GetAccountInfo {
    accountInfo {
      id
      firstName
      lastName
      name
      gender
      dateOfBirth
      email
      phone
      image
      imageUrl
      subscribedToNewsLetter
      createdAt
      updatedAt
      defaultAddress {
        id
        addressType
        customerId
        firstName
        lastName
        companyName
        address
        city
        state
        stateName
        country
        countryName
        postcode
        email
        phone
        vatId
        defaultAddress
        useForShipping
        createdAt
        updatedAt
      }
      addresses {
        id
        addressType
        customerId
        firstName
        lastName
        companyName
        address
        city
        state
        stateName
        country
        countryName
        postcode
        email
        phone
        vatId
        defaultAddress
        useForShipping
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * Generate dynamic accountInfo query with timestamp to bypass Bagisto cache bug
 *
 * IMPORTANT: Bagisto has a caching bug where accountInfo query returns stale cached data
 * even after mutations. By using a unique query name with timestamp, we force Bagisto
 * to execute a fresh query instead of returning cached results.
 *
 * @returns GraphQL query string with unique name based on current timestamp
 */
export const getDynamicAccountInfoQuery = () => {
  const timestamp = Date.now();
  return /* GraphQL */ `
    query GetAccountInfo${timestamp} {
      accountInfo {
        id
        firstName
        lastName
        name
        gender
        dateOfBirth
        email
        phone
        image
        imageUrl
        subscribedToNewsLetter
        createdAt
        updatedAt
        defaultAddress {
          id
          addressType
          customerId
          firstName
          lastName
          companyName
          address
          city
          state
          stateName
          country
          countryName
          postcode
          email
          phone
          vatId
          defaultAddress
          useForShipping
          createdAt
          updatedAt
        }
        addresses {
          id
          addressType
          customerId
          firstName
          lastName
          companyName
          address
          city
          state
          stateName
          country
          countryName
          postcode
          email
          phone
          vatId
          defaultAddress
          useForShipping
          createdAt
          updatedAt
        }
      }
    }
  `;
};

export const getCustomerAddressesQuery = /* GraphQL */ `
  query CustomerAddresses($first: Int, $page: Int) {
    customerAddresses(first: $first, page: $page) {
      paginatorInfo {
        count
        currentPage
        lastPage
        total
      }
      data {
        id
        addressType
        customerId
        firstName
        lastName
        companyName
        address
        city
        state
        stateName
        country
        countryName
        postcode
        email
        phone
        vatId
        defaultAddress
        useForShipping
      }
    }
  }
`;

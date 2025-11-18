# Product Detail Page Flow

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     User Journey Flow                           │
└─────────────────────────────────────────────────────────────────┘

1. Search/Collection Page
   ↓
   app/(public)/search/page.tsx
   app/(public)/search/[collection]/page.tsx
   │
   ├─ Fetch products: getProducts()
   │  └─ GraphQL: getCollectionProductsQuery
   │
   └─ Display: ProductGridItems
      └─ Each: ProductCard
         └─ Link: /product/${urlKey}?type=${type}

2. User clicks on product
   ↓
   
3. Product Detail Page
   ↓
   app/(public)/product/[handle]/page.tsx
   │
   ├─ URL params:
   │  - handle = urlKey
   │  - type = productType
   │
   ├─ Backend Calls:
   │  ├─ getCollectionProducts()
   │  │  └─ Fetch product data (price, images, variants)
   │  │
   │  └─ getCollectionReviewProducts()
   │     └─ Fetch reviews, ratings, additional data
   │
   └─ Display Components:
      ├─ HeroCarousel (images)
      ├─ ProductDescription
      │  ├─ Product info (name, price, rating)
      │  ├─ VariantSelector
      │  ├─ AddToCart button
      │  └─ ProductMoreDetails
      │
      ├─ Rating system
      └─ RelatedProducts grid

```

## Data Flow

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ 1. Navigate to /product/{urlKey}?type={type}
       ↓
┌─────────────────────────────────────────┐
│   Next.js Server (App Router)          │
│   app/(public)/product/[handle]/page.tsx│
└──────┬──────────────────────────────────┘
       │ 2. Extract params & searchParams
       ↓
┌─────────────────────────────────────────┐
│   Backend Functions                     │
│   lib/bagisto/index.ts                  │
└──────┬──────────────────────────────────┘
       │ 3. Call getCollectionProducts()
       │    & getCollectionReviewProducts()
       ↓
┌─────────────────────────────────────────┐
│   GraphQL API                           │
│   Bagisto Backend                       │
└──────┬──────────────────────────────────┘
       │ 4. Return product data
       ↓
┌─────────────────────────────────────────┐
│   Data Transformation                   │
│   reshapeProducts() helper              │
└──────┬──────────────────────────────────┘
       │ 5. Format data for frontend
       ↓
┌─────────────────────────────────────────┐
│   React Components                      │
│   - HeroCarousel                        │
│   - ProductDescription                  │
│   - VariantSelector                     │
│   - AddToCart                           │
│   - ProductMoreDetails                  │
│   - RatingStars                         │
│   - RelatedProducts                     │
└──────┬──────────────────────────────────┘
       │ 6. Render HTML
       ↓
┌─────────────┐
│   Browser   │ Display product detail page
└─────────────┘
```

## Component Hierarchy

```
page.tsx (Product Detail Page)
│
├─ generateMetadata()
│  └─ SEO meta tags, Open Graph, JSON-LD
│
├─ HeroCarousel
│  └─ Image slider with navigation
│
├─ ProductDescription
│  │
│  ├─ Product Header
│  │  ├─ Product name (h1)
│  │  ├─ Price
│  │  └─ Rating
│  │
│  ├─ VariantSelector (Suspense)
│  │  └─ Dynamic variant options
│  │
│  ├─ Short Description (Prose)
│  │
│  ├─ AddToCart (Suspense)
│  │  ├─ Quantity selector
│  │  └─ Add to cart button
│  │
│  └─ ProductMoreDetails (Suspense)
│     ├─ Description tab
│     ├─ Additional info tab
│     └─ Reviews tab
│
├─ RatingStars Section
│  ├─ Kualitas Bahan
│  ├─ Desain
│  ├─ Kenyamanan
│  └─ Harga
│
└─ RelatedProducts (Suspense)
   └─ Grid of ProductCard components
```

## Backend Integration Points

### 1. Product Data Fetching
```typescript
// lib/bagisto/index.ts
export async function getCollectionProducts({
  collection,  // urlKey from URL
  type,        // product type from query param
  page: "product"
}) {
  // GraphQL query to fetch product details
  const res = await bagistoFetch<BagistoCollectionProductsOperation>({
    query: getCollectionProductQuery,
    variables: { input }
  });
  
  return reshapeProducts(res.body.data.allProducts.data);
}
```

### 2. Review Data Fetching
```typescript
// lib/bagisto/index.ts
export async function getCollectionReviewProducts({
  collection,  // urlKey
  page: "product"
}) {
  // GraphQL query to fetch reviews and additional info
  const res = await bagistoFetch<any>({
    query: getProductInfoQuery,
    variables: { input }
  });
  
  return res.body.data.allProducts.data[0];
}
```

### 3. Static Path Generation
```typescript
// app/(public)/product/[handle]/page.tsx
export async function generateStaticParams() {
  const products = await getAllProductUrls();
  
  return products.map((product) => ({
    handle: `${product.slug}?type=${product.type}`
  }));
}
```

## State Management

### URL State
- Product identifier: Path parameter `[handle]`
- Product type: Query parameter `?type=`
- Selected variants: Query parameters `?size=&color=`

### Client State (React)
- Image carousel: Current slide index
- Variant selection: Selected options
- Cart: Redux store

### Server State
- Product data: Fetched on server
- Reviews: Fetched on server
- Related products: Fetched on server

## Performance Optimizations

1. **Static Generation**: Pre-render product pages at build time
2. **Suspense**: Stream components as they load
3. **Image Optimization**: Next.js Image component with lazy loading
4. **Caching**: LRU cache for frequently accessed data
5. **Skeleton Loading**: Show placeholders while loading

## SEO Features

1. **Dynamic Metadata**
   - Page title from product name
   - Meta description from product description
   - Canonical URL

2. **Open Graph**
   - og:title, og:description
   - og:image with product image
   - og:type = "product"

3. **Structured Data (JSON-LD)**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Product",
     "name": "Product Name",
     "description": "Product Description",
     "image": "Product Image URL",
     "offers": {
       "@type": "Offer",
       "availability": "InStock",
       "priceCurrency": "IDR",
       "price": "100000"
     }
   }
   ```

4. **Robots Meta**
   - index/noindex based on product visibility
   - follow/nofollow for crawlers

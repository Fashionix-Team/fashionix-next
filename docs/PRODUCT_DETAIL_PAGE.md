# Product Detail Page Documentation

## Overview
Halaman detail produk (Product Detail Page) adalah halaman yang menampilkan informasi lengkap tentang sebuah produk. Halaman ini sudah sepenuhnya terintegrasi dengan backend Bagisto melalui GraphQL API.

## Lokasi File
- **Route**: `/app/(public)/product/[handle]/page.tsx`
- **URL Pattern**: `/product/{urlKey}?type={productType}`

## Fitur Utama

### 1. Informasi Produk
- **Nama produk**: Ditampilkan sebagai heading utama
- **Harga**: Menampilkan harga reguler dan harga final (jika ada diskon)
- **Rating**: Menampilkan rating rata-rata dan jumlah review
- **Deskripsi**: Deskripsi singkat dan lengkap produk
- **Status ketersediaan**: In stock atau out of stock

### 2. Galeri Gambar
- **Carousel**: Slider gambar produk dengan navigasi next/prev
- **Multiple images**: Support untuk menampilkan beberapa gambar produk
- **Zoom on hover**: Efek zoom saat hover (group-hover:scale-105)
- **Responsive**: Menyesuaikan dengan ukuran layar

### 3. Variant Selector
- **Configurable products**: Support untuk produk dengan varian (ukuran, warna, dll)
- **Dynamic options**: Opsi yang tidak tersedia otomatis di-disable
- **URL synchronization**: Varian yang dipilih disimpan di URL parameter

### 4. Add to Cart
- **Validation**: Memastikan semua varian required sudah dipilih
- **Quantity selector**: Memilih jumlah produk yang akan dibeli
- **Cart integration**: Terintegrasi dengan Redux cart state

### 5. Rating System
- **Interactive ratings**: User dapat memberikan rating untuk berbagai kriteria:
  - Kualitas Bahan
  - Desain
  - Kenyamanan
  - Harga
- **Star ratings**: Visual rating dengan bintang 1-5

### 6. Product Reviews
- **Display reviews**: Menampilkan review dari user lain
- **Rating statistics**: Statistik rating produk
- **Review count**: Jumlah total review

### 7. Related Products
- **Product recommendations**: Menampilkan produk terkait
- **Grid layout**: Layout grid responsif (1-4 kolom)
- **Product cards**: Setiap produk ditampilkan dengan gambar, nama, dan harga

### 8. SEO Optimization
- **Dynamic metadata**: Title dan description berdasarkan produk
- **Open Graph tags**: Support untuk social media sharing
- **Structured data**: JSON-LD schema untuk search engines
- **Proper indexing**: Robot meta tags yang benar

## Koneksi Backend

### GraphQL Queries
1. **getCollectionProducts**: Mengambil data detail produk
   ```typescript
   {
     collection: urlKey,
     type: productType,
     page: "product"
   }
   ```

2. **getCollectionReviewProducts**: Mengambil review dan info tambahan
   ```typescript
   {
     collection: urlKey,
     page: "product"
   }
   ```

### Data yang Diambil
- Product ID, name, description
- Price (regular & final)
- Images/gallery
- Product type & status
- Inventory information
- Configurable options (variants)
- Reviews & ratings
- Related products
- Additional attributes

## Routing & Navigation

### Dari Search/Collection Page
Produk di halaman search/collection menggunakan komponen `ProductCard` yang me-link ke:
```typescript
href={`/product/${product.urlKey}?type=${product.type}`}
```

### Parameter URL
- **handle** (path parameter): Berisi `urlKey` produk
- **type** (query parameter): Tipe produk (simple, configurable, dll)
- **variant parameters**: Parameter varian yang dipilih (size, color, dll)

## Static Generation

### generateStaticParams
Fungsi ini menghasilkan static paths untuk semua produk:
```typescript
export async function generateStaticParams() {
  const products = await getAllProductUrls();
  return products.map((product) => ({
    handle: `${product.slug}?type=${product.type}`
  }));
}
```

### generateMetadata
Menghasilkan metadata dinamis untuk SEO:
```typescript
export async function generateMetadata({ params, searchParams }) {
  const product = await getCollectionProducts({...});
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [...] }
  };
}
```

## Komponen Utama

### 1. HeroCarousel (`/components/product/slider/hero-carousel.tsx`)
- Image slider dengan navigation
- Framer Motion animations
- Responsive image sizing

### 2. ProductDescription (`/components/product/product-description.tsx`)
- Product info display
- Variant selector integration
- Add to cart button
- Product details tabs

### 3. VariantSelector (`/components/product/variant-selector.tsx`)
- Dynamic variant options
- Availability checking
- URL parameter management

### 4. ProductMoreDetails (`/components/product/producr-more-detail.tsx`)
- Tabbed interface untuk details, reviews
- Additional product attributes
- Review listing

### 5. RatingStars (`/components/product/rating-starts.tsx`)
- Interactive star rating component
- Support untuk multiple criteria

## Suspense & Loading States

Halaman ini menggunakan React Suspense untuk loading states:
```typescript
<Suspense fallback={<ProductDetailSkeleton />}>
  <HeroCarousel images={...} />
</Suspense>
```

Skeleton components:
- `ProductDetailSkeleton`: Loading state untuk gambar produk
- `RelatedProductSkeleton`: Loading state untuk related products

## Error Handling

### Not Found
Jika produk tidak ditemukan, halaman akan redirect ke 404:
```typescript
if (!product[0]) return notFound();
```

## Testing & Development

### Prerequisites
1. Environment variables harus di-set (lihat `.env.example`)
2. Backend Bagisto harus running dan accessible
3. GraphQL endpoint harus valid

### Local Development
```bash
npm run dev
# atau
bun dev
```

### Build
```bash
npm run build
# atau
bun run build
```

### Linting
```bash
npm run lint
```

## Customization

### Menambah Field Baru
1. Update GraphQL query di `/lib/bagisto/queries/collection.ts`
2. Update type definition di `/lib/bagisto/types.ts`
3. Tampilkan di `ProductDescription` component

### Mengubah Layout
Edit file `/app/(public)/product/[handle]/page.tsx`:
```typescript
<div className="flex flex-col gap-y-4 lg:flex-row lg:gap-8">
  {/* Layout customization here */}
</div>
```

### Menambah Rating Criteria
Edit bagian rating di `/app/(public)/product/[handle]/page.tsx`:
```typescript
<RatingStars criteria="Kriteria Baru" />
```

## Troubleshooting

### Issue: Product tidak ditemukan
- Pastikan `urlKey` di URL benar
- Cek apakah produk exists di backend
- Verify GraphQL query response

### Issue: Gambar tidak muncul
- Cek `next.config.js` remotePatterns
- Pastikan IMAGE_DOMAIN environment variable benar
- Verify image URLs dari backend

### Issue: Variant tidak berfungsi
- Cek configutableData dari backend
- Verify variant options dan index data
- Check URL parameters update

## Future Enhancements

- [ ] Add product zoom functionality
- [ ] Implement 360° product view
- [ ] Add product video support
- [ ] Wishlist integration
- [ ] Share product functionality
- [ ] Recently viewed products
- [ ] Size guide modal
- [ ] Product comparison feature

## References

- [Next.js Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Bagisto GraphQL API](https://bagisto.com/en/documentation/)

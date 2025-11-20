import type { RelatedProducts } from "@/lib/bagisto/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { 
  ChevronRightIcon,
  ShieldCheckIcon,
  TruckIcon,
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  CreditCardIcon
} from "@heroicons/react/24/outline";
import {
  ProductDetailSkeleton,
  RelatedProductSkeleton,
} from "@/components/product/place-order";
import { ProductDescription } from "@/components/product/product-description";
import { getAllProductUrls, getCollectionProducts } from "@/lib/bagisto";
import {
  BASE_SCHEMA_URL,
  NOT_IMAGE,
  PRODUCT_OFFER_TYPE,
  PRODUCT_TYPE,
} from "@/lib/constants";
import { isArray, isObject } from "@/lib/type-guards";
import { ProductCard } from "@/components/product-card";
import Grid from "@/components/grid";
import HeroCarousel from "@/components/product/slider/hero-carousel";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const prooducts = await getAllProductUrls();

  return isObject(prooducts)
    ? prooducts.map((post) => ({
        handle: `${post.slug}?type=${post.type}`,
      }))
    : [];
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const { type } = await searchParams;

  const product = await getCollectionProducts({
    collection: handle,
    type: type,
    page: "product",
  });

  if (!product) return notFound();
  const data = product[0];
  const { url, altText: alt } = data?.images?.[0] || {};

  const { width, height = "100", name, description } = data || {};
  const indexable = true;

  return {
    title: name,
    description: description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ type: string }>;
}) {
  const { handle } = await params;
  const { type } = await searchParams;

  const product = await getCollectionProducts({
    collection: handle,
    type: type,
    page: "product",
  });

  if (!product[0]) return notFound();
  const data = product[0];
  const productJsonLd = {
    "@context": BASE_SCHEMA_URL,
    "@type": PRODUCT_TYPE,
    name: data?.name,
    description: data?.description,
    image: data?.images?.[0]?.url,
    offers: {
      "@type": PRODUCT_OFFER_TYPE,
      availability:
        data?.inventories?.[0]?.qty || 0 > 0
          ? `${BASE_SCHEMA_URL}/InStock`
          : `${BASE_SCHEMA_URL}/OutOfStock`,
      priceCurrency: data?.priceHtml.currencyCode,
      highPrice: data?.priceHtml?.regularPrice,
      lowPrice: data?.priceHtml?.regularPrice,
    },
  };

  return (
    <div className="bg-white">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
        type="application/ld+json"
      />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 py-4 bg-[#F3F4F6] px-4 rounded-md mb-6">
          <Link href="/" className="hover:text-neutral-900">
            Beranda
          </Link>
          <ChevronRightIcon className="h-3 w-3" />
          <span className="text-blue-500 font-medium">{data?.name || "Pakaian"}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4">        
        {/* --- BAGIAN BAWAH: GAMBAR PRODUK & DETAIL PEMBELIAN --- */}
        <div className="flex flex-col gap-8 lg:flex-row mb-12">
          {/* Left: Image Gallery - 50% */} 
          <div className="w-full lg:w-1/2 border border-gray-100 p-4 rounded-md">
            <Suspense fallback={<ProductDetailSkeleton />}>
              {isArray(data?.cacheGalleryImages) ? (
                <HeroCarousel
                  images={
                    data?.cacheGalleryImages?.map((image) => ({
                      src: image?.originalImageUrl || "",
                      altText: image?.originalImageUrl || "",
                    })) || []
                  }
                />
              ) : (
                <HeroCarousel
                  images={[
                    {
                      src: NOT_IMAGE,
                      altText: "product image",
                    },
                  ]}
                />
              )}
            </Suspense>
          </div>

          {/* Right Section: Info Produk & Tombol Beli - 50% */}
          <div className="flex w-full flex-col gap-6 lg:w-1/2">
            {/* Product Info */}
            <div className="flex-1">
              <ProductDescription product={product} />
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="container mx-auto px-4">
        <Suspense fallback={<RelatedProductSkeleton />}>
          <RelatedProducts relatedProduct={data?.relatedProducts || []} />
        </Suspense>
      </div>
    </div>
  );
}

async function RelatedProducts({
  relatedProduct,
}: {
  relatedProduct: RelatedProducts[];
}) {
  if (!relatedProduct.length) return null;

  return (
    <div className="flex flex-col gap-y-10 py-8 sm:py-12 lg:py-20 border-t border-gray-200">
      <div className="flex flex-col gap-y-4 font-outfit text-center">
        <h2 className="text-3xl font-bold text-gray-900">Produk Terkait</h2>
        <p className="font-normal text-gray-500">
           Temukan tren terbaru! Produk baru saja ditambahkan.
        </p>
      </div>
      <Grid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProduct.map((item, index) => (
          <ProductCard
            key={index}
            currency={item?.priceHtml?.currencyCode}
            imageUrl={
              item?.cacheGalleryImages?.[0]?.originalImageUrl ??
              item?.images?.[0]?.url ??
              NOT_IMAGE
            }
            price={
              item?.priceHtml?.finalPrice ||
              item?.priceHtml?.regularPrice ||
              "0"
            }
            product={item}
          />
        ))}
      </Grid>
    </div>
  );
}
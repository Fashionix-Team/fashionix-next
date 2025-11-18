import RatingStars from "@/components/product/rating-starts";
import type { RelatedProducts } from "@/lib/bagisto/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
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
  let prooducts: any[] = [];
  try {
    prooducts = await getAllProductUrls();
  } catch (error) {
    console.error("generateStaticParams: failed to load product urls:", error);
    return [];
  }

  return isObject(prooducts)
    ? prooducts.map((post: any) => ({
        handle: `${post.slug}?type=${post.type}`,
      }))
    : [];
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const { type } = await searchParams;

  let product: any = null;
  try {
    product = await getCollectionProducts({
      collection: handle,
      type: type,
      page: "product",
    });
  } catch (error) {
    console.error("generateMetadata: failed to load product:", error);
    return notFound();
  }

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

  let product: any = null;
  try {
    product = await getCollectionProducts({
      collection: handle,
      type: type,
      page: "product",
    });
  } catch (error) {
    console.error("ProductPage: failed to load product:", error);
    return notFound();
  }

  if (!product?.[0]) return notFound();
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
        (Number(data?.inventories?.[0]?.qty) || 0) > 0
          ? `${BASE_SCHEMA_URL}/InStock`
          : `${BASE_SCHEMA_URL}/OutOfStock`,
      priceCurrency: data?.priceHtml.currencyCode,
      highPrice: data?.priceHtml?.regularPrice,
      lowPrice: data?.priceHtml?.regularPrice,
    },
  };

  try {
    return (
      <>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productJsonLd),
          }}
          type="application/ld+json"
        />
        <div className="flex flex-col gap-y-4 rounded-lg pb-0 pt-4 sm:gap-y-6 md:py-7.5 lg:flex-row lg:gap-8">
          <div className="h-full w-full max-w-[885px]">
            <Suspense fallback={<ProductDetailSkeleton />}>
                {isArray(data?.cacheGalleryImages) ? (
                <HeroCarousel
                  images={
                    data?.cacheGalleryImages?.map((image: any) => ({
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
          <div className="basis-full lg:basis-4/6">
            <ProductDescription product={product} slug={handle} />
            <div className="mt-8 border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Beri Rating Produk Ini</h2>
              <RatingStars criteria="Kualitas Bahan" />
              <RatingStars criteria="Desain" />
              <RatingStars criteria="Kenyamanan" />
              <RatingStars criteria="Harga" />
            </div>
          </div>
        </div>

        <Suspense fallback={<RelatedProductSkeleton />}>
          <RelatedProductsList relatedProduct={data?.relatedProducts || []} />
        </Suspense>
      </>
    );
  } catch (renderError) {
    // eslint-disable-next-line no-console
    console.error("ProductPage: render error:", renderError);
    return (
      <div className="container mx-auto py-24">
        <div className="mx-auto max-w-3xl rounded-md border border-neutral-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-semibold">Oh no!</h1>
          <p className="mt-4 text-neutral-600 text-sm">
            Terjadi masalah saat menampilkan produk ini. Silakan coba lagi atau
            kembali ke halaman sebelumnya.
          </p>
        </div>
      </div>
    );
  }
}

async function RelatedProductsList({
  relatedProduct,
}: {
  relatedProduct: RelatedProducts[];
}) {
  if (!relatedProduct.length) return null;

  return (
    <div className="flex flex-col gap-y-10 py-8 sm:py-12 lg:py-20">
      <div className="flex flex-col gap-y-4 font-outfit">
        <h2 className="text-4xl font-semibold">Related Products</h2>
        <p className="dark:b-neutral-300 font-normal text-black/[60%] dark:text-neutral-300">
          Discover the latest trends! Fresh products just added—shop new styles,
          tech, and essentials before they&apos;re gone.
        </p>
      </div>
      <Grid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {relatedProduct.map((item: any, index: number) => (
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

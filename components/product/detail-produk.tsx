import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductDetail } from "@/lib/bagisto";
import DetailProdukForm from "./detail-produk-form";
import type { DetailProdukProps } from "@/lib/bagisto/types";
import { NOT_IMAGE } from "@/lib/constants";

export async function generateMetadata({ params }: DetailProdukProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductDetail({ urlKey: slug });

  if (!product) {
    return { title: "Produk Tidak Ditemukan" };
  }

  const imageUrl = product.cacheGalleryImages?.[0]?.originalImageUrl || 
                   product.images?.[0]?.url || 
                   NOT_IMAGE;

  return {
    title: product.name,
    description: product.shortDescription || product.description,
    openGraph: {
      title: product.name,
      description: product.shortDescription || product.description,
      images: [{ url: imageUrl, width: 800, height: 600, alt: product.name }],
    },
  };
}

export default async function DetailProduk({ params }: DetailProdukProps) {
  const { slug } = await params;
  const product = await getProductDetail({ urlKey: slug });

  if (!product) {
    return notFound();
  }

  return (
    <Suspense fallback={<FormSkeleton />}>
      <DetailProdukForm product={product} />
    </Suspense>
  );
}

function FormSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="grid grid-cols-4 gap-2">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

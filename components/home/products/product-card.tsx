import Image from "next/image";
import type { Product } from "@/types/product";
import ProductBadge from "./product-badge";
import ProductRating from "./product-rating";

export default function ProductCard({ product, actions }: { product: Product; actions?: React.ReactNode }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

      <div className="relative flex items-center justify-center p-6">
        <Image
          src={product.image}
          alt={product.title}
          width={256}
          height={256}
          className="h-auto max-w-full object-contain"
          sizes="(min-width: 1280px) 256px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={false}
        />
        {actions}
      </div>

      <ProductBadge badge={product.badge} />
      
      <div className="flex flex-col gap-4 p-6">
        <ProductRating reviews={product.reviews} />

        <h6 className="text-sm font-semibold leading-6 text-gray-900">{product.title}</h6>

        <p className="text-lg font-semibold text-gray-900">
          {product.priceOriginal && (
            <del className="mr-2 text-sm font-normal text-gray-500">{product.priceOriginal}</del>
          )}
          {product.price}
        </p>
      </div>
    </div>
  );
}

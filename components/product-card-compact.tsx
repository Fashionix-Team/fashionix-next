"use client";

import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import { NOT_IMAGE } from "@/lib/constants";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";

interface ProductCardCompactProps {
  currency: string;
  price: string;
  imageUrl: string;
  product: {
    urlKey: string;
    name: string;
    id: string;
    type: string;
    rating?: number;
    reviewCount?: number;
  };
  badge?: string;
}

export const ProductCardCompact: FC<ProductCardCompactProps> = ({
  currency,
  price,
  imageUrl,
  product,
  badge,
}) => {
  const formatPrice = (priceStr: string) => {
    const numPrice = parseFloat(priceStr.replace(/[^0-9]/g, ''));
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  const renderStars = (rating: number = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarIcon key={i} className="h-3.5 w-3.5 text-orange-400 fill-orange-400" />
        );
      } else {
        stars.push(
          <StarOutlineIcon key={i} className="h-3.5 w-3.5 text-gray-300" />
        );
      }
    }
    return stars;
  };

  return (
    <Link
      href={`/product/${product.urlKey}?type=${product.type}`}
      prefetch={false}
      className="group block bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-700">
        {badge && (
          <div className={`absolute top-2 left-2 z-10 text-white text-[10px] font-bold px-2.5 py-0.5 rounded uppercase ${
            badge === 'HOT' ? 'bg-red-500' : badge === 'BEST DEALS' ? 'bg-blue-500' : 'bg-orange-500'
          }`}>
            {badge}
          </div>
        )}
        <Image
          src={imageUrl || NOT_IMAGE}
          alt={product.name || "Product image"}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Product Info */}
      <div className="p-3 space-y-2">
        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {renderStars(product.rating || 4)}
          </div>
          {product.reviewCount && (
            <span className="text-[11px] text-gray-500 dark:text-gray-400">
              ({product.reviewCount})
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-normal text-gray-800 dark:text-white leading-tight line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>

        {/* Price */}
        <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
          {formatPrice(price)}
        </p>
      </div>
    </Link>
  );
};

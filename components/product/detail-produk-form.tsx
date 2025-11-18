"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Image from "next/image";
import type { ProductDetailFormProps, ProductSuperAttribute } from "@/lib/bagisto/types";
import { useAddProduct } from "@/components/hooks/use-add-to-cart";
import LoadingDots from "@/components/loading-dots";
import { ProductCard } from "@/components/product-card";
import Grid from "@/components/grid";
import { NOT_IMAGE, SEPATU_PLACEHOLDER } from "@/lib/constants";

export default function DetailProdukForm({ product }: ProductDetailFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedSize, setSelectedSize] = useState<string>("");
  
  const { onAddToCart, isCartLoading } = useAddProduct();

  const maxStock = product.inventories?.[0]?.qty || 0;
  const isOutOfStock = maxStock === 0;

  const mainImage = product.cacheGalleryImages?.[0]?.originalImageUrl || 
                    product.images?.[0]?.url || 
                    SEPATU_PLACEHOLDER;

  const allImages = product.cacheGalleryImages || product.images || [];
  
  const displayImages = allImages.length > 0 
    ? allImages 
    : [
        { originalImageUrl: SEPATU_PLACEHOLDER, url: SEPATU_PLACEHOLDER },
        { originalImageUrl: SEPATU_PLACEHOLDER, url: SEPATU_PLACEHOLDER },
        { originalImageUrl: SEPATU_PLACEHOLDER, url: SEPATU_PLACEHOLDER },
        { originalImageUrl: SEPATU_PLACEHOLDER, url: SEPATU_PLACEHOLDER },
      ];

  const handleIncrement = () => {
    if (quantity < maxStock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= maxStock) {
      setQuantity(value);
    }
  };

  const handleOptionSelect = (attributeId: string, optionId: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [attributeId]: optionId,
    });
  };

  const handleAddToCart = async () => {
    const superAttribute = Object.entries(selectedOptions).map(([attributeId, optionId]) => ({
      attributeId: parseInt(attributeId),
      attributeOptionId: parseInt(String(optionId)),
    }));

    await onAddToCart({
      input: {
        productId: product.id,
        quantity,
        superAttribute: superAttribute.length > 0 ? superAttribute : undefined,
        isBuyNow: false,
      },
    });
  };

  const renderColorOptions = (attribute: ProductSuperAttribute) => {
    return (
      <div className="flex flex-wrap gap-2">
        {attribute.options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleOptionSelect(attribute.id, option.id)}
            className={clsx(
              "relative h-10 w-10 rounded-full border-2 transition-all",
              selectedOptions[attribute.id] === option.id
                ? "border-orange-500 ring-2 ring-orange-200"
                : "border-gray-300 hover:border-gray-400"
            )}
            style={{ backgroundColor: option.swatchValue || "#cccccc" }}
            title={option.label}
          >
            {selectedOptions[attribute.id] === option.id && (
              <span className="absolute inset-0 flex items-center justify-center text-white text-xs">✓</span>
            )}
          </button>
        ))}
      </div>
    );
  };

  const renderSizeOptions = (attribute: ProductSuperAttribute) => {
    return (
      <div className="flex flex-wrap gap-2">
        {attribute.options.map((option) => {
          const isSelected = selectedOptions[attribute.id] === option.id;
          
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                handleOptionSelect(attribute.id, option.id);
                setSelectedSize(option.label);
              }}
              className={clsx(
                "min-w-12 px-4 py-2 rounded border-2 font-medium transition-all",
                isSelected
                  ? "border-orange-500 bg-orange-50 text-orange-600"
                  : "border-gray-300 hover:border-gray-400 bg-white"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  };

  const renderDefaultOptions = (attribute: ProductSuperAttribute) => {
    return (
      <div className="flex flex-wrap gap-2">
        {attribute.options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleOptionSelect(attribute.id, option.id)}
            className={clsx(
              "px-4 py-2 rounded border-2 font-medium transition-all",
              selectedOptions[attribute.id] === option.id
                ? "border-orange-500 bg-orange-50 text-orange-600"
                : "border-gray-300 hover:border-gray-400"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <ol className="flex items-center gap-2">
          <li><a href="/" className="hover:text-orange-500">Home</a></li>
          <li>/</li>
          <li><a href="/product" className="hover:text-orange-500">Produk</a></li>
          <li>/</li>
          <li className="text-gray-900 font-medium">{product.name}</li>
        </ol>
      </nav>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-gray-200">
            <Image src={mainImage} alt={product.name} fill className="object-cover" priority />
            {product.new && (
              <span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                NEW
              </span>
            )}
            {product.isInSale && (
              <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                SALE
              </span>
            )}
          </div>

          {displayImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {displayImages.slice(0, 4).map((image: any, index: number) => (
                <button
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg border-2 border-gray-200 hover:border-orange-500 transition"
                >
                  <Image
                    src={image.originalImageUrl || image.url}
                    alt={`${product.name} - ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info & Form */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
              Sepatu
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
              Onitsuka
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={clsx(
                    "h-5 w-5",
                    index < Math.floor(product.averageRating || 0) ? "text-yellow-400" : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.averageRating?.toFixed(1) || "0.0"} Penilaian Bintang
            </span>
            <span className="text-sm text-gray-600">({product.reviews?.length || 0} Ulasan)</span>
          </div>

          {/* Price and Options */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-orange-500">
                Rp. {product.priceHtml?.finalPrice?.toLocaleString("id-ID") || product.price?.toLocaleString("id-ID")}
              </span>
              {product.specialPrice && product.specialPrice < product.price && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    Rp. {product.priceHtml?.regularPrice?.toLocaleString("id-ID")}
                  </span>
                  <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-sm font-semibold">
                    {Math.round(((product.price - product.specialPrice) / product.price) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {product.superAttributes && product.superAttributes.length > 0 && (
              <div className="flex flex-col gap-4">
                {product.superAttributes.map((attribute) => (
                  <div key={attribute.id} className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">{attribute.adminName}</label>
                    {attribute.code === "color" && renderColorOptions(attribute)}
                    {attribute.code === "size" && renderSizeOptions(attribute)}
                    {attribute.code !== "color" && attribute.code !== "size" && renderDefaultOptions(attribute)}
                  </div>
                ))}
              </div>
            )}

            {(!product.superAttributes || !product.superAttributes.find(attr => attr.code === "size")) && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Ukuran</label>
                <div className="flex flex-wrap gap-2">
                  {["38", "39", "40", "41", "42"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={clsx(
                        "min-w-12 px-4 py-2 rounded border-2 font-medium transition-all",
                        selectedSize === size
                          ? "border-orange-500 bg-orange-50 text-orange-600"
                          : "border-gray-300 hover:border-gray-400"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <label className="text-sm font-semibold text-gray-700">Jumlah:</label>
              <div className="flex items-center border-2 border-gray-300 rounded-lg">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MinusIcon className="h-5 w-5" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  disabled={isOutOfStock}
                  className="w-16 text-center border-x-2 border-gray-300 py-2 focus:outline-none"
                  min={1}
                  max={maxStock}
                />
                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={quantity >= maxStock || isOutOfStock}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>
              <span className="text-sm text-gray-500">
                {isOutOfStock ? "Stok habis" : `${maxStock} tersedia`}
              </span>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock || isCartLoading}
                className={clsx(
                  "relative flex-1 py-3 rounded-lg font-semibold transition-all flex items-center justify-center",
                  isOutOfStock || isCartLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                )}
              >
                {isCartLoading ? (
                  <>
                    <LoadingDots className="bg-white" />
                    <span className="ml-2">Menambahkan...</span>
                  </>
                ) : (
                  <span>{isOutOfStock ? "Stok Habis" : "TAMBAH KE KERANJANG"}</span>
                )}
              </button>
              
              <button
                type="button"
                disabled={isOutOfStock}
                className={clsx(
                  "px-6 py-3 rounded-lg border-2 font-semibold transition-all",
                  isOutOfStock
                    ? "border-gray-300 text-gray-400 cursor-not-allowed"
                    : "border-orange-500 text-orange-500 hover:bg-orange-50"
                )}
              >
                BELI SEKARANG
              </button>
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">Pengiriman:</span>
                <span className="text-gray-600">Gratis ongkir untuk pembelian minimal Rp. 100.000</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">Estimasi:</span>
                <span className="text-gray-600">3-4 hari kerja</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="border-t pt-8 mb-12">
        <h2 className="text-2xl font-bold mb-4">Deskripsi</h2>
        <div className="prose max-w-none">
          {product.description ? (
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          ) : (
            <p className="text-gray-600">{product.shortDescription}</p>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="border-t pt-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">Fitur</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard icon="🚚" title="Gratis Ongkir" description="Gratis ongkir untuk pembelian minimal Rp. 100.000" />
          <FeatureCard icon="🔄" title="Garansi I Tahun" description="Garansi resmi 1 tahun dari distributor" />
          <FeatureCard icon="💯" title="Garansi Uang Kembali 100%" description="Jika barang tidak sesuai atau rusak" />
          <FeatureCard icon="📞" title="Layanan Pelanggan 24 Jam" description="Siap membantu Anda kapan saja" />
        </div>
      </div>

      {/* Shipping Info */}
      <div className="border-t pt-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">Informasi Pengiriman</h2>
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-orange-100 p-2 rounded">
              <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Kurir: 4 - 5 hari, gratis ongkir</h3>
              <p className="text-sm text-gray-600">Pengiriman Lokal: 3-4 hari kerja</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="border-t pt-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Ulasan Pengguna ({product.reviews.length})</h2>
          <div className="space-y-4">
            {product.reviews.slice(0, 5).map((review: any) => (
              <div key={review.id} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {review.customer?.firstName?.[0] || review.name?.[0] || "U"}
                    </div>
                    <div>
                      <p className="font-semibold">{review.customer?.name || review.name}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, index) => (
                          <StarIcon
                            key={index}
                            className={clsx("h-4 w-4", index < review.rating ? "text-yellow-400" : "text-gray-300")}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString("id-ID")}
                  </span>
                </div>
                {review.title && <h4 className="font-semibold mb-2">{review.title}</h4>}
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Products */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Produk Terkait</h2>
          <Grid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {product.relatedProducts.map((relatedProduct: any) => (
              <ProductCard
                key={relatedProduct.id}
                currency={relatedProduct.priceHtml?.currencyCode || "IDR"}
                imageUrl={
                  relatedProduct.cacheGalleryImages?.[0]?.originalImageUrl ||
                  relatedProduct.images?.[0]?.url ||
                  NOT_IMAGE
                }
                price={relatedProduct.priceHtml?.finalPrice || relatedProduct.price || "0"}
                product={relatedProduct}
              />
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string; }) {
  return (
    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

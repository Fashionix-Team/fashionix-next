"use client";

import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { Modal, ModalContent, ModalBody } from "@heroui/react";
import { NOT_IMAGE } from "@/lib/constants";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

interface QuickViewProduct {
  id: string;
  name: string;
  urlKey: string;
  type: string;
  price: string;
  currency: string;
  images: Array<{
    url: string;
    altText?: string;
  }>;
  description?: string;
  brand?: string;
  variants?: Array<{
    id: string;
    name: string;
    options: string[];
  }>;
  inStock?: boolean;
  rating?: number;
  reviewCount?: number;
}

interface QuickViewModalProps {
  product: QuickViewProduct;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("42");
  const [selectedColor, setSelectedColor] = useState("Warna");

  useEffect(() => {
    if (isOpen) {
      setSelectedImage(0);
      setQuantity(1);
      setSelectedSize("42");
      setSelectedColor("Warna");
    }
  }, [isOpen]);

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const formatPrice = (price: string) => {
    const numPrice = parseInt(price);
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(numPrice);
  };

  const currentImage = product.images?.[selectedImage]?.url || NOT_IMAGE;
  const imageAlt = product.images?.[selectedImage]?.altText || product.name;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      scrollBehavior="inside"
      closeButton={<span />}
      classNames={{
        base: "bg-white max-w-[80vw] max-h-[85vh]",
        body: "p-0 overflow-y-auto",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody className="p-0">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-md hover:bg-gray-100"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
              {/* Left Side - Images */}
              <div className="bg-white p-8">
                {/* Main Image */}
                <div className="relative mb-4 h-[450px] w-full">
                  <Image
                    src={currentImage}
                    alt={imageAlt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>

                {/* Thumbnail Images with Navigation */}
                {product.images && product.images.length > 1 ? (
                  <div className="flex items-center justify-center gap-2">
                    {/* Left Arrow */}
                    <button
                      onClick={() => {
                        const container = document.getElementById('thumbnail-scroll');
                        if (container) container.scrollLeft -= 280;
                      }}
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-white shadow-md hover:bg-orange-600"
                    >
                      ←
                    </button>

                    {/* Thumbnails Container */}
                    <div 
                      id="thumbnail-scroll"
                      className="flex w-[280px] gap-2 overflow-hidden scroll-smooth"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 bg-white transition ${
                            selectedImage === index
                              ? "border-orange-500"
                              : "border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          <Image
                            src={image.url || NOT_IMAGE}
                            alt={image.altText || `${product.name} ${index + 1}`}
                            fill
                            className="object-contain p-1"
                            sizes="64px"
                          />
                        </button>
                      ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                      onClick={() => {
                        const container = document.getElementById('thumbnail-scroll');
                        if (container) container.scrollLeft += 280;
                      }}
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-white shadow-md hover:bg-orange-600"
                    >
                      →
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    {/* Left Arrow */}
                    <button
                      onClick={() => {
                        const container = document.getElementById('thumbnail-scroll');
                        if (container) container.scrollLeft -= 280;
                      }}
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-white shadow-md hover:bg-orange-600"
                    >
                      ←
                    </button>

                    {/* Thumbnails Container */}
                    <div 
                      id="thumbnail-scroll"
                      className="flex w-[280px] gap-2 overflow-hidden scroll-smooth"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {[1, 2, 3, 4, 5, 6].map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 bg-white transition ${
                            selectedImage === index
                              ? "border-orange-500"
                              : "border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          <Image
                            src={currentImage}
                            alt={`${product.name} ${index + 1}`}
                            fill
                            className="object-contain p-1"
                            sizes="64px"
                          />
                        </button>
                      ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                      onClick={() => {
                        const container = document.getElementById('thumbnail-scroll');
                        if (container) container.scrollLeft += 280;
                      }}
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-white shadow-md hover:bg-orange-600"
                    >
                      →
                    </button>
                  </div>
                )}
              </div>

              {/* Right Side - Product Details */}
              <div className="flex flex-col p-8">
                {/* Rating Stars */}
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIconSolid
                        key={star}
                        className="h-5 w-5 text-orange-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {product.rating || 4.7} Penilaian Bintang
                  </span>
                  <span className="text-sm text-gray-500">
                    ({product.reviewCount || 21671} Ulasan Pengguna)
                  </span>
                </div>

                {/* Product Title */}
                <h2 className="mb-4 text-xl font-normal leading-snug text-gray-900">
                  {product.name}
                </h2>

                {/* Availability */}
                <div className="mb-4 space-y-1">
                  <p className="text-sm text-gray-600">
                    Ketersediaan: <span className="font-medium text-green-600">Tersedia</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Merek: <span className="font-medium text-gray-900">{product.brand || "Onitsuka"}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Kategori: <span className="font-medium text-gray-900">Sepatu</span>
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <p className="text-3xl font-medium text-blue-600">
                    {formatPrice(product.price)}
                  </p>
                </div>

                {/* Color and Size Selection */}
                <div className="mb-6 space-y-4">
                  {/* Color Selection */}
                  <div className="flex items-start gap-4">
                    <label className="w-20 pt-2 text-sm font-medium text-gray-700">Warna</label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedColor("Warna")}
                        className={`h-10 w-10 rounded-full border-2 bg-gradient-to-br from-orange-200 to-orange-300 transition ${
                          selectedColor === "Warna" ? "border-orange-500 ring-2 ring-orange-200" : "border-gray-300"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="flex items-start gap-4">
                    <label className="w-20 pt-2 text-sm font-medium text-gray-700">Ukuran</label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="42">42</option>
                      <option value="40">40</option>
                      <option value="41">41</option>
                      <option value="43">43</option>
                      <option value="44">44</option>
                    </select>
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  {/* Quantity Selector */}
                  <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange("decrement")}
                      className="px-4 py-3 text-lg hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <input
                      type="text"
                      value={quantity < 10 ? `0${quantity}` : quantity}
                      readOnly
                      className="w-16 border-x border-gray-300 py-3 text-center text-sm font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => handleQuantityChange("increment")}
                      className="px-4 py-3 text-lg hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-orange-500 px-8 py-3 text-sm font-semibold uppercase text-white transition hover:bg-orange-600"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                    Tambah ke Keranjang
                  </button>

                  {/* Buy Now Button */}
                  <button
                    type="button"
                    className="rounded-lg border-2 border-orange-500 px-8 py-3 text-sm font-semibold uppercase text-orange-500 transition hover:bg-orange-50"
                  >
                    Beli Sekarang
                  </button>
                </div>

                {/* Compare Product Link */}
                <div className="mb-6 flex items-center justify-end">
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                    <span>📋</span>
                    Bagikan produk
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="border-t pt-4 text-sm text-gray-600">
                  <p className="mb-1">100% Aman & Terjamin Saat Checkout</p>
                </div>
              </div>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default QuickViewModal;

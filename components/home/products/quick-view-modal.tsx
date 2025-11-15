"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import Image from "next/image";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Product } from "@/types/product";
import { useAddProduct } from "@/components/hooks/use-add-to-cart";
import { fetchHandler } from "@/lib/fetch-handler";
import { ProductDetailsInfo } from "@/lib/bagisto/types";
import LoadingDots from "@/components/loading-dots";

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function QuickViewModal({
  isOpen,
  onClose,
  product,
}: QuickViewModalProps) {
  const [activeImage, setActiveImage] = useState<string>("");
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [productDetails, setProductDetails] = useState<ProductDetailsInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { onAddToCart, isCartLoading } = useAddProduct();

  // Fetch product details from backend when modal opens
  const fetchProductDetails = useCallback(async () => {
    if (!product) return;

    setIsLoading(true);
    try {
      // Use urlKey if available, otherwise use id
      const productIdentifier = product.urlKey || product.id;
      
      // Fetch detailed product info from Bagisto API
      const response = await fetchHandler({
        url: `product/${productIdentifier}`,
        method: "GET",
      });

      if (response?.data?.product) {
        setProductDetails(response.data.product);
        
        // Set active image to first gallery image if available
        if (response.data.product.cacheGalleryImages?.[0]?.originalImageUrl) {
          setActiveImage(response.data.product.cacheGalleryImages[0].originalImageUrl);
        }
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setIsLoading(false);
    }
  }, [product]);

  useEffect(() => {
    if (isOpen && product) {
      setActiveImage(product.image);
      setQty(1);
      setSelectedSize("");
      fetchProductDetails();
    }
  }, [isOpen, product, fetchProductDetails]);

  const handleAddToCart = async () => {
    if (!product) return;

    const input = {
      input: {
        quantity: qty,
        productId: product.id,
        selectedConfigurableOption: undefined,
        superAttribute: [],
        isBuyNow: false,
      },
    };

    await onAddToCart(input);
  };

  const handleBuyNow = async () => {
    if (!product) return;

    const input = {
      input: {
        quantity: qty,
        productId: product.id,
        selectedConfigurableOption: undefined,
        superAttribute: [],
        isBuyNow: true,
      },
    };

    await onAddToCart(input);
    onClose();
  };

  if (!product) return null;

  // Ensure gallery images have valid URLs
  const galleryImages = (productDetails?.cacheGalleryImages || []).filter(
    (img) => img?.originalImageUrl && img.originalImageUrl.trim() !== ""
  );

  // Fallback to product image if no gallery images
  const validGalleryImages =
    galleryImages.length > 0
      ? galleryImages
      : product.image && product.image.trim() !== ""
      ? [{ originalImageUrl: product.image, smallImageUrl: "", mediumImageUrl: "", largeImageUrl: "" }]
      : [];

  // Ensure activeImage is always valid
  const displayImage = activeImage && activeImage.trim() !== "" ? activeImage : validGalleryImages[0]?.originalImageUrl || "/placeholder.png";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      scrollBehavior="inside"
      classNames={{
        base: "bg-white",
        header: "border-b border-gray-200",
        body: "py-6",
        closeButton: "hover:bg-gray-100 active:bg-gray-200 text-gray-500 hover:text-gray-900",
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Quick View</h2>
            </ModalHeader>
            <ModalBody>
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <LoadingDots className="bg-orange-500" />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {/* LEFT SIDE - Images */}
                  <div className="space-y-4">
                    <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200">
                      {displayImage && (
                        <Image
                          src={displayImage}
                          alt={productDetails?.name || product.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      )}
                    </div>

                    {/* Thumbnails */}
                    {validGalleryImages.length > 1 && (
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {validGalleryImages.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveImage(img.originalImageUrl)}
                            className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                              activeImage === img.originalImageUrl
                                ? "border-orange-500"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            {img.originalImageUrl && (
                              <Image
                                src={img.originalImageUrl}
                                alt={`${productDetails?.name || product.title} - ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* RIGHT SIDE - Product Info */}
                  <div className="flex flex-col space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {productDetails?.name || product.title}
                      </h2>

                      {/* Rating */}
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center gap-1 text-yellow-500">
                          <span>⭐</span>
                          <span className="font-medium">
                            {productDetails?.priceHtml?.regularPrice ? "5.0" : "0"}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">
                          (0 Ulasan)
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3">
                      <p className="text-3xl font-bold text-orange-600">
                        {product.price}
                      </p>
                      {product.priceOriginal && (
                        <del className="text-lg text-gray-500">
                          {product.priceOriginal}
                        </del>
                      )}
                    </div>

                    {/* Description */}
                    {productDetails?.shortDescription && (
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm text-gray-600">
                          {productDetails.shortDescription}
                        </p>
                      </div>
                    )}

                    {/* Size Selector - Only show if product has variants */}
                    {productDetails?.configutableData?.attributes?.[0] && (
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-900">
                          Pilih{" "}
                          {productDetails.configutableData.attributes[0].label}
                        </label>
                        <Select
                          placeholder={`Pilih ${productDetails.configutableData.attributes[0].label}`}
                          selectedKeys={selectedSize ? [selectedSize] : []}
                          onSelectionChange={(keys) => {
                            const selected = Array.from(keys)[0];
                            setSelectedSize(selected as string);
                          }}
                          classNames={{
                            trigger: "border-gray-300",
                          }}
                        >
                          {productDetails.configutableData.attributes[0].options.map(
                            (option) => (
                              <SelectItem key={option.id}>
                                {option.label}
                              </SelectItem>
                            )
                          )}
                        </Select>
                      </div>
                    )}

                    {/* Quantity */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-900">
                        Jumlah
                      </label>
                      <div className="flex items-center gap-3">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="bordered"
                          onPress={() => qty > 1 && setQty(qty - 1)}
                          className="border-gray-300"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </Button>

                        <span className="w-12 text-center text-lg font-medium">
                          {qty}
                        </span>

                        <Button
                          isIconOnly
                          size="sm"
                          variant="bordered"
                          onPress={() => setQty(qty + 1)}
                          className="border-gray-300"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Stock Status */}
                    {productDetails?.inventories?.[0] && (
                      <div>
                        {parseInt(productDetails.inventories[0].qty) > 0 ? (
                          <span className="inline-flex items-center gap-2 text-sm font-medium text-green-600">
                            <span className="h-2 w-2 rounded-full bg-green-600"></span>
                            Stok Tersedia ({productDetails.inventories[0].qty})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 text-sm font-medium text-red-600">
                            <span className="h-2 w-2 rounded-full bg-red-600"></span>
                            Stok Habis
                          </span>
                        )}
                      </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 border-t border-gray-200 pt-6">
                      <Button
                        onPress={handleAddToCart}
                        isLoading={isCartLoading}
                        isDisabled={
                          !productDetails?.inventories?.[0] ||
                          parseInt(productDetails.inventories[0].qty) <= 0
                        }
                        className="flex-1 bg-orange-500 font-semibold text-white hover:bg-orange-600"
                        size="lg"
                      >
                        {isCartLoading ? "Menambahkan..." : "Tambah ke Keranjang"}
                      </Button>

                      <Button
                        onPress={handleBuyNow}
                        isLoading={isCartLoading}
                        isDisabled={
                          !productDetails?.inventories?.[0] ||
                          parseInt(productDetails.inventories[0].qty) <= 0
                        }
                        variant="bordered"
                        className="flex-1 border-orange-500 font-semibold text-orange-500 hover:bg-orange-50"
                        size="lg"
                      >
                        Beli Sekarang
                      </Button>
                    </div>

                    {/* Additional Info */}
                    {productDetails?.productFlats?.[0] && (
                      <div className="space-y-2 border-t border-gray-200 pt-4">
                        <div className="flex items-start justify-between text-sm">
                          <span className="font-medium text-gray-700">
                            Meta Title:
                          </span>
                          <span className="text-gray-600">
                            {productDetails.productFlats[0].metaTitle}
                          </span>
                        </div>
                        {productDetails.productFlats[0].width && (
                          <div className="flex items-start justify-between text-sm">
                            <span className="font-medium text-gray-700">
                              Ukuran:
                            </span>
                            <span className="text-gray-600">
                              {productDetails.productFlats[0].width} x{" "}
                              {productDetails.productFlats[0].height}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

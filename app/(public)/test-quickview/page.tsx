"use client";

import { useState } from "react";
import QuickViewModal from "@/components/product/quick-view-modal";

export default function QuickViewTest() {
  const [isOpen, setIsOpen] = useState(false);

  const testProduct = {
    id: "test-1",
    name: "Test Product",
    urlKey: "test-product",
    type: "simple",
    price: "150000",
    currency: "IDR",
    images: [
      { url: "/image/product/product-43.png", altText: "Test Product" }
    ],
    description: "This is a test product",
    inStock: true,
    rating: 4.5,
    reviewCount: 10,
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={() => {
          console.log("Button clicked!");
          setIsOpen(true);
        }}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Open Quick View Test
      </button>

      <QuickViewModal
        product={testProduct}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}

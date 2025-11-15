"use client";

import React, { useState } from "react";

export default function QuickViewPreview() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [qty, setQty] = useState(1);

  const products = [
    {
      id: "1",
      title:
        "Sepatu Onitsuka Laki laki Wanita Mexico 66 White / Black Sneakers Unisex",
      price: 1500000,
      rating: 4.7,
      review: 21671,
      brand: "Onitsuka",
      category: "Sepatu",
      images: [
        "/image/product/sepatu-1.jpg",
        "/image/product/product-43.png",
        "/image/product/product-44.png",
        "/image/product/product-45.png",
        "/image/product/product-46.png",
      ],
    },
  ];

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setActiveImage(product.images[0]);
    setQty(1);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-semibold mb-6">Quick View Preview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <img
              src={product.images[0]}
              className="w-full h-40 object-contain mb-4"
            />

            <h3 className="font-semibold text-gray-800 leading-tight">
              {product.title}
            </h3>

            <p className="text-gray-600 mt-1">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(product.price)}
            </p>

            <button
              onClick={() => openModal(product)}
              className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
            >
              Quick View
            </button>
          </div>
        ))}
      </div>

      {/* ----------------------------------- */}
      {/* ----------- QUICK VIEW MODAL ------ */}
      {/* ----------------------------------- */}

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 md:w-4/5 lg:w-3/4 rounded-lg overflow-hidden shadow-xl relative p-6">
            
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute right-4 top-3 text-gray-500 text-2xl hover:text-black"
            >
              ×
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* LEFT SIDE - Images */}
              <div>
                <img
                  src={activeImage}
                  className="w-full h-80 object-contain border rounded-md mb-4"
                />

                {/* Thumbnails */}
                <div className="flex gap-3 overflow-x-auto">
                  {selectedProduct.images.map((img: string, index: number) => (
                    <img
                      key={index}
                      src={img}
                      onClick={() => setActiveImage(img)}
                      className={`h-20 w-20 object-cover border rounded cursor-pointer ${
                        activeImage === img ? "border-orange-500" : "border-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE - Product Info */}
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedProduct.title}
                </h2>

                <div className="flex items-center gap-2 mt-2 text-yellow-500">
                  ⭐ {selectedProduct.rating}  
                  <span className="text-gray-600 text-sm">
                    ({selectedProduct.review} Ulasan)
                  </span>
                </div>

                <p className="text-gray-700 mt-1 text-sm">
                  Merek: {selectedProduct.brand}
                </p>

                <p className="text-gray-700 text-sm mb-3">
                  Kategori: {selectedProduct.category}
                </p>

                <p className="text-2xl font-semibold text-blue-600 mt-4">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(selectedProduct.price)}
                </p>

                {/* Size Selector */}
                <div className="mt-4">
                  <p className="font-medium text-gray-800">Ukuran</p>
                  <select className="border rounded p-2 mt-1 w-32">
                    <option>40</option>
                    <option>41</option>
                    <option>42</option>
                    <option>43</option>
                  </select>
                </div>

                {/* Quantity */}
                <div className="mt-4 flex items-center gap-3">
                  <p className="font-medium text-gray-800">Jumlah</p>

                  <button
                    onClick={() => qty > 1 && setQty(qty - 1)}
                    className="px-3 py-1 border rounded"
                  >
                    -
                  </button>

                  <span className="px-4">{qty}</span>

                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-3 py-1 border rounded"
                  >
                    +
                  </button>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex gap-4">
                  <button className="px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg">
                    Tambah ke Keranjang
                  </button>

                  <button className="px-5 py-3 border border-orange-500 text-orange-500 hover:bg-orange-50 rounded-lg">
                    Beli Sekarang
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

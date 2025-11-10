"use client";

import { useEffect } from 'react';

export default function QuickViewPreview() {
  useEffect(() => {
    // dynamically load the public script
    const id = 'quickview-script';
    if (!document.getElementById(id)) {
      const s = document.createElement('script');
      s.id = id;
      s.src = '/quick-view-produk.js';
      s.defer = true;
      document.body.appendChild(s);
    }
  }, []);

  const products = [
    {
      id: '1',
      title: 'Sepatu Running Original',
      price: 1500000,
      images: [
        '/image/product/sepatu-1.jpg',
        '/image/product/product-43.png',
        '/image/product/product-44.png'
      ]
    },
    {
      id: '2',
      title: 'Jam Tangan Sport',
      price: 1200000,
      images: [
        '/image/product/jam-2.jpg',
        '/image/product/jam-4.jpg'
      ]
    },
    {
      id: '3',
      title: 'Botol Minum Premium',
      price: 180000,
      images: [
        '/image/product/botol-3.jpg',
        '/image/product/product-43.png'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-semibold mb-6">Quick View Preview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <img 
              src={product.images[0]} 
              alt={product.title} 
              className="w-full h-40 object-contain mb-4" 
            />
            <h3 className="font-medium">{product.title}</h3>
            <p className="text-gray-500 text-sm">
              {new Intl.NumberFormat('id-ID', { 
                style: 'currency', 
                currency: 'IDR' 
              }).format(product.price)}
            </p>
            <div className="mt-4 flex gap-2">
              <button 
                className="quick-view-trigger inline-flex items-center gap-2 px-3 py-2 bg-orange-500 text-white rounded"
                data-quickview-id={product.id}
                data-quickview-title={product.title}
                data-quickview-price={product.price}
                data-quickview-image={product.images.join(',')}
              >
                Quick View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

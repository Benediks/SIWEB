'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedDot, setSelectedDot] = useState(2); // The third dot (index 2) is selected

  // Product details
  const product = {
    name: "TDR-3000",
    price: "Rp 800.000,00",
    description: "Ditempa dan dirakit oleh kuil Ngawi dengan penuh cinta",
    stock: 129,
    images: [
      "/images/tdr-3000-1.png",
      "/images/tdr-3000-2.png",
      "/images/tdr-3000-3.png"
    ]
  };

  // Recommended products
  const recommendedProducts = [
    {
      id: 1,
      name: "CMYK",
      price: "Rp 1.200.000,00",
      image: "/images/cmwk.png"
    },
    {
      id: 2,
      name: "SMP 12",
      price: "Rp 500.000,00",
      image: "/images/smp-12.png"
    },
    {
      id: 3,
      name: "JMK 48",
      price: "Rp 650.000,00",
      image: "/images/jmk-48.png"
    }
  ];

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navbar */}
      <header className="py-4 px-6 flex justify-between items-center border-b">
        <Link href="/">
          <div className="flex items-center">
            <Image src="/images/logo0.png" alt="Ce4L Logo" width={80} height={30} />
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          <button className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Product Detail Section */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <div className="bg-gray-100 p-4 rounded">
              <Image 
                src="/images/toko1.png" 
                alt={product.name} 
                width={600} 
                height={500} 
                className="w-full object-contain"
              />
            </div>
            {/* Image selection dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {[0, 1, 2].map((index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedDot(index)}
                  className={`w-2 h-2 rounded-full ${index === selectedDot ? 'bg-black' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl font-bold mt-2">{product.price}</p>
            <p className="mt-4 text-gray-700">{product.description}</p>
            
            {/* Quantity Selector */}
            <div className="mt-8">
              <p className="mb-2">Qty</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded">
                  <button 
                    onClick={decreaseQuantity}
                    className="px-3 py-1 text-lg"
                  >
                    -
                  </button>
                  <span className="px-3 py-1">{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    className="px-3 py-1 text-lg"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">Stock: {product.stock}</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Link href="/keranjang">
            <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
              Tambahkan ke Keranjang
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recommended Products Section */}
      <div className="max-w-6xl mx-auto px-6 mt-16">
        <h2 className="text-2xl font-bold mb-6">Rekomendasi Produk Lainnya</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recommendedProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div className="bg-gray-100 p-6 rounded">
                <div className="mb-4">
                  <Image 
                    src="/images/toko2.png" 
                    alt={product.name} 
                    width={200} 
                    height={200} 
                    className="w-full object-contain"
                  />
                </div>
                <h3 className="font-bold">{product.name}</h3>
                <p className="mt-2 text-sm">{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-4 px-6 border-t">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="mb-4 md:mb-0">Ce4L © 2025</div>
          <div className="flex space-x-8">
            <Link href="/about">About</Link>
            <Link href="/locations">Locations</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
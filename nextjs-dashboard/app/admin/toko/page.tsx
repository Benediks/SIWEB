'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedDot, setSelectedDot] = useState(0);
  const fileInputRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(true); // Toggle for admin mode
  
  // Editable product details
  const [product, setProduct] = useState({
    name: "TDR-3000",
    price: "Rp 800.000,00",
    description: "Ditempa dan dirakit oleh kuil Ngawi dengan penuh cinta",
    stock: 129,
    images: [
      "/images/tdr-3000-1.png",
      "/images/tdr-3000-2.png",
      "/images/tdr-3000-3.png"
    ]
  });

  // Recommended products
  const [recommendedProducts, setRecommendedProducts] = useState([
    {
      id: 1,
      name: "CMWK",
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
  ]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const saveChanges = () => {
    // Logic to save changes (e.g., send to backend)
    console.log("Product updated:", product);
    alert("Product changes saved successfully!");
  };

  const handleImageClick = (index) => {
    setSelectedDot(index);
  };

  const handleFileUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    
    // Replace the currently selected image
    const newImages = [...product.images];
    newImages[selectedDot] = imageUrl;
    
    setProduct(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const triggerFileInput = () => {
    if (isAdmin) {
      fileInputRef.current.click();
    }
  };

  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-2" onClick={toggleAdminMode}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          {isAdmin && (
            <button 
              onClick={saveChanges}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          )}
        </div>
      </header>

      {/* Admin mode indicator */}
      {isAdmin && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="font-bold">Admin Edit Mode</p>
          <p>You can now edit product details. Click on text fields to edit and use the edit icon to change images.</p>
        </div>
      )}

      {/* Product Detail Section */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <div 
              className="bg-gray-100 p-4 rounded relative" 
              onClick={triggerFileInput}
            >
              <Image 
                src={product.images[selectedDot]} 
                alt={product.name} 
                width={600} 
                height={500} 
                className="w-full object-contain"
              />
              {isAdmin && (
                <div className="absolute top-4 left-4 bg-white p-2 rounded-full shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileUpload} 
              />
            </div>
            {/* Image selection dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {product.images.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => handleImageClick(index)}
                  className={`w-2 h-2 rounded-full ${index === selectedDot ? 'bg-black' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {isAdmin ? (
              <input 
                type="text" 
                name="name" 
                value={product.name} 
                onChange={handleChange} 
                className="text-3xl font-bold w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <h1 className="text-3xl font-bold">{product.name}</h1>
            )}
            
            {isAdmin ? (
              <input 
                type="text" 
                name="price" 
                value={product.price} 
                onChange={handleChange} 
                className="text-xl font-bold mt-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <p className="text-xl font-bold mt-2">{product.price}</p>
            )}
            
            {isAdmin ? (
              <textarea 
                name="description" 
                value={product.description} 
                onChange={handleChange} 
                className="mt-4 text-gray-700 w-full h-24 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <p className="mt-4 text-gray-700">{product.description}</p>
            )}
            
            <div className="mt-8 flex justify-between items-center">
              <div>
                <p className="mb-2">Qty</p>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    onClick={decreaseQuantity} 
                    className="px-3 py-1 border-r border-gray-300"
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button 
                    onClick={increaseQuantity} 
                    className="px-3 py-1 border-l border-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex items-center">
                <p className="mr-2">Stock:</p>
                {isAdmin ? (
                  <input 
                    type="number" 
                    name="stock" 
                    value={product.stock} 
                    onChange={handleChange} 
                    className="w-16 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <p>{product.stock}</p>
                )}
              </div>
            </div>
            
            <button 
              className="mt-8 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Tambahkan Ke Keranjang
            </button>
          </div>
        </div>

        {/* Recommended Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Rekomendasi Produk Lainnya</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendedProducts.map((item) => (
              <div key={item.id} className="bg-gray-100 p-4 rounded">
                <div className="relative h-48">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    layout="fill" 
                    objectFit="contain"
                  />
                </div>
                <h3 className="mt-4 text-lg font-bold">{item.name}</h3>
                <p className="mt-2 font-semibold">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600">Ce4L © 2025</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            <Link href="/locations" className="text-gray-600 hover:text-gray-900">Locations</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

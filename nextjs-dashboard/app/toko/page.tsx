'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Define TypeScript interfaces for the data
interface Product {
  id_produk: string;
  nama_produk: string;
  harga: number;
  image: string;
  stock: number;
  deskripsi?: string;
  sales?: number;
}

interface FormattedProduct {
  id: string;
  name: string;
  price: string;
  image: string;
}

export default function ProductGridPage() {
  const [products, setProducts] = useState<FormattedProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch products from the database when component mounts
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        
        // Get products array from response
        const productsData: Product[] = data.products || data;
        
        // Format the products data
        const formattedProducts: FormattedProduct[] = productsData.map(product => ({
          id: product.id_produk,
          name: product.nama_produk,
          price: `Rp ${product.harga.toLocaleString('id-ID')},00`,
          image: product.image
        }));
        
        setProducts(formattedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Header/Navbar */}
      <Navbar />

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-white text-xl">Loading products...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link href={`/toko/detailproduk?id=${product.id.slice(1)}`} key={product.id}>
                <div className="bg-gray-100 p-4 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="aspect-[4/3] relative overflow-hidden bg-white mb-4 flex items-center justify-center">
                    <Image 
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={225}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="mt-1 text-gray-800">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
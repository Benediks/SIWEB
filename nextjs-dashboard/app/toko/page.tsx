'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { products as placeholderProducts } from '@/lib/placeholder-data'; // Importing the placeholder data

export default function ProductGridPage() {
  // Use the imported placeholder data
  const products = placeholderProducts.map(product => ({
    id: product.id_produk, // Map to the required format
    name: product.nama_produk,
    price: `Rp ${product.harga.toLocaleString('id-ID')},00`, // Format price
    image: product.image
  }));

  return (
    <div className="min-h-screen bg-black">
      {/* Header/Navbar */}
      <Navbar />

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

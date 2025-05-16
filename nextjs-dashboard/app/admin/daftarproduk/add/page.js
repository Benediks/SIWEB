'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama_produk: '',
    harga: '',
    stock: '',
    deskripsi: '',
    image: '/images/toko1.png', // Default image
    sales: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'harga' || name === 'stock' ? Number(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add product');
      }

      router.push('/admin/daftarproduk');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - same as in daftarproduk */}
      <div className="w-64 bg-gray-700 text-white">
        <Link href="/">
          <div className="p-4 flex items-center">
            <Image src="/images/navlogo.png" alt="Ce4L Logo" width={80} height={30} />
            <span className="ml-2 text-xl font-semibold">Admin</span>
          </div>
        </Link>
        <nav className="mt-6">
          <Link href="/admin/dashboard" className="block py-4 px-6 hover:bg-gray-600">
            Dashboard
          </Link>
          <Link href="/admin/daftarproduk" className="block py-4 px-6 bg-gray-800 border-l-4 border-blue-500">
            Daftar Produk
          </Link>
          <Link href="/admin/daftartransaksi" className="block py-4 px-6 hover:bg-gray-600">
            Daftar Transaksi
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Add New Product</h1>
          <div className="flex items-center">
            <Link href="/authentication/login">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </Link>
            <Link href="/authentication/login">
              <span className="ml-2 font-medium">Admin</span>
            </Link>
          </div>
        </header>

        {/* Form Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama_produk">
                  Nama Produk
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nama_produk"
                  type="text"
                  name="nama_produk"
                  value={formData.nama_produk}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="harga">
                    Harga
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="harga"
                    type="number"
                    name="harga"
                    value={formData.harga}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                    Stock
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="stock"
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deskripsi">
                  Deskripsi
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="deskripsi"
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                  Image URL
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="image"
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => router.push('/admin/daftarproduk')}
                  type="button"
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white p-4 text-center border-t">
          <p className="text-sm text-gray-600">CE4L © 2025</p>
        </footer>
      </div>
    </div>
  );
}
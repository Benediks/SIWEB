'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DaftarProduk() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Delete product handler
  const handleDeleteProduct = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete product');
        }
        
        // Remove product from state
        setProducts(products.filter(product => product.id_produk !== id));
      } catch (error) {
        alert(error.message);
      }
    }
  };

  // Handle edit product
  const handleEditProduct = (id) => {
    router.push(`/admin/daftarproduk/edit/${id}`);
  };

  // Handle add product
  const handleAddProduct = () => {
    router.push('/admin/daftarproduk/add');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - same as in dashboard */}
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
          <h1 className="text-2xl font-bold">Daftar Produk</h1>
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

        {/* Products Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Daftar Produk</h2>
            <button 
              onClick={handleAddProduct}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Tambah Produk
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-10">Loading products...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : (
            <div className="bg-white rounded shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id_produk}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id_produk}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 relative">
                            <Image 
                              src={product.image || "/images/placeholder.png"} 
                              alt={product.nama_produk}
                              width={40}
                              height={40}
                              className="rounded"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.nama_produk}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Rp {product.harga.toLocaleString('id-ID')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sales}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => handleEditProduct(product.id_produk)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id_produk)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white p-4 text-center border-t">
          <p className="text-sm text-gray-600">CE4L © 2025</p>
        </footer>
      </div>
    </div>
  );
}
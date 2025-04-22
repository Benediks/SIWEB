"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function DaftarProduk() {
  // Data produk contoh
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'TDR-3000',
      price: 800000.00,
      stock: 129,
      description: 'Ditempa dan dirakit oleh kuli Ngawi dengan penuh cinta',
      image: '/images/product.png'
    },
    {
      id: 2,
      name: 'TDR-3000',
      price: 800000.00,
      stock: 129,
      description: 'Ditempa dan dirakit oleh kuli Ngawi dengan penuh cinta',
      image: '/images/product.png'
    },
    {
      id: 3,
      name: 'TDR-3000',
      price: 800000.00,
      stock: 129,
      description: 'Ditempa dan dirakit oleh kuli Ngawi dengan penuh cinta',
      image: '/images/product.png'
    }
  ]);

  // State untuk modal tambah/edit produk
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: '',
    price: 0,
    stock: 0,
    description: '',
    image: ''
  });

  // Fungsi untuk menampilkan modal tambah produk
  const handleAddProduct = () => {
    setEditMode(false);
    setCurrentProduct({
      id: null,
      name: '',
      price: 0,
      stock: 0,
      description: '',
      image: ''
    });
    setShowModal(true);
  };

  // Fungsi untuk menampilkan modal edit produk
  const handleEditProduct = (product:any) => {
    setEditMode(true);
    setCurrentProduct(product);
    setShowModal(true);
  };

  // Fungsi untuk menghapus produk
  const handleDeleteProduct = (id:any) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  // Fungsi untuk menyimpan produk (baik tambah maupun edit)
  const handleSaveProduct = (e:any) => {
    e.preventDefault();
    
    if (editMode) {
      // Update produk yang sudah ada
      setProducts(products.map(product => 
        product.id === currentProduct.id ? currentProduct : product
      ));
    } else {
      // Tambah produk baru
      const newProduct = {
        ...currentProduct,
        id: products.length + 1
      };
      setProducts([...products, newProduct]);
    }
    
    setShowModal(false);
  };

  // Fungsi untuk mengubah nilai input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    });
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
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
          <div className="flex justify-end mb-4">
            <button 
              onClick={handleAddProduct}
              className="bg-black text-white px-4 py-2 rounded flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Tambah Produk
            </button>
          </div>

          {/* Product List */}
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="bg-gray-200 p-4 rounded shadow-sm flex">
                <div className="w-32 h-32 bg-white p-2">
                  <Image src={product.image} alt={product.name} width={120} height={120} />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditProduct(product)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-1">Rp {product.price.toLocaleString('id-ID')}</p>
                  <div className="flex mt-3 text-sm">
                    <p className="mr-4"><span className="font-medium">Stock:</span> {product.stock}</p>
                    <p><span className="font-medium">Deskripsi:</span> {product.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white p-4 text-center border-t">
          <p className="text-sm text-gray-600">CE4L © 2025</p>
        </footer>
      </div>

      {/* Modal for Add/Edit Product */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{editMode ? 'Edit Produk' : 'Tambah Produk'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSaveProduct}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Nama Produk
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentProduct.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                    Harga (Rp)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={currentProduct.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                    Stok
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={currentProduct.stock}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Deskripsi
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={currentProduct.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="3"
                  required
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                  URL Gambar
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={currentProduct.image}
                  onChange={handleInputChange}
                  placeholder="/images/product.png"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {editMode ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
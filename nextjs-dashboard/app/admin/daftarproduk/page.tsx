"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { products as placeholderProducts } from '@/lib/placeholder-data'; // Importing the placeholder data
// Define TypeScript interfaces for better type safety
interface Product {
  id_produk: string; // Unique identifier
  nama_produk: string;
  harga: number;
  stock: number;
  deskripsi: string;
  image: string;
}
export default function DaftarProduk() {
  // Use the imported placeholder data
  const [products, setProducts] = useState<Product[]>(placeholderProducts);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    id_produk: "",
    nama_produk: "",
    harga: 0,
    stock: 0,
    deskripsi: "",
    image: ""
  });

  // State for selected product detail view
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fungsi untuk menampilkan modal tambah produk
  const handleAddProduct = () => {
    setEditMode(false);
    setCurrentProduct({
      id_produk: "",
      nama_produk: "",
      harga: 0,
      stock: 0,
      deskripsi: "",
      image: ""
    });
    setShowModal(true);
  };

  // Fungsi untuk menampilkan modal edit produk
  const handleEditProduct = (product: Product) => {
    setEditMode(true);
    setCurrentProduct(product);
    setShowModal(true);
  };

  // Fungsi untuk menghapus produk
  const handleDeleteProduct = (id_produk: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      setProducts(products.filter(product => product.id_produk !== id_produk));
      if (selectedProduct && selectedProduct.id_produk === id_produk) {
        setSelectedProduct(null);
      }
    }
  };

  // Fungsi untuk menyimpan produk (baik tambah maupun edit)
  const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (editMode) {
      // Update produk yang sudah ada
      setProducts(products.map(product => 
        product.id_produk === currentProduct.id_produk ? currentProduct : product
      ));
      
      // Update selected product if it's being edited
      if (selectedProduct && selectedProduct.id_produk === currentProduct.id_produk) {
        setSelectedProduct(currentProduct);
      }
    } else {
      // Tambah produk baru
      const newProduct = {
        ...currentProduct,
        id_produk: `p000${products.length + 1}` // Generate new id_produk
      };
      setProducts([...products, newProduct]);
    }
    
    setShowModal(false);
  };

  // Fungsi untuk mengubah nilai input form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: name === 'harga' || name === 'stock' ? Number(value) : value
    });
  };

  // Handle click on a product row to show details
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
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

          {/* Product List and Details */}
          <div className="flex space-x-6">
            {/* Products List */}
            <div className="w-1/2">
              <div className="bg-white p-4 rounded shadow-sm mb-6">
                <div className="flex justify-between mb-4 text-gray-700 font-medium">
                  <div className="w-1/3">id_produk</div>
                  <div className="w-1/3">nama_produk</div>
                  <div className="w-1/3 text-right">Harga (Rp)</div>
                </div>
                {products.map((product) => (
                  <div 
                    key={product.id_produk} 
                    className={`flex justify-between items-center p-3 rounded cursor-pointer mb-2 ${selectedProduct?.id_produk === product.id_produk ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="w-1/3">{product.id_produk}</div>
                    <div className="w-1/3">{product.nama_produk}</div>
                    <div className="w-1/3 text-right">{product.harga.toLocaleString('id-ID')}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Detail */}
            <div className="w-1/2">
              {selectedProduct ? (
                <div className="bg-white p-4 rounded shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Detail Produk</h2>
                  <div className="flex justify-center mb-4">
                    <Image 
                      src={selectedProduct.image || "/images/product.png"} 
                      alt={selectedProduct.nama_produk} 
                      width={200} 
                      height={200} 
                      className="border border-gray-200"
                    />
                  </div>
                  <div className="border-b pb-4 mb-4">
                    <div className="grid grid-cols-2 gap-y-4">
                      <div>
                        <p className="text-sm text-gray-500">id_produk</p>
                        <p>{selectedProduct.id_produk}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">nama_produk</p>
                        <p>{selectedProduct.nama_produk}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">harga (Rp)</p>
                        <p>{selectedProduct.harga.toLocaleString('id-ID')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">stok</p>
                        <p>{selectedProduct.stock}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <p className="text-sm text-gray-500">deskripsi</p>
                    <p className="mt-1">{selectedProduct.deskripsi}</p>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEditProduct(selectedProduct)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(selectedProduct.id_produk)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-4 rounded shadow-sm h-32 flex items-center justify-center text-gray-500">
                  Pilih produk untuk melihat detail
                </div>
              )}
            </div>
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
          <div className="bg-white p-6 rounded-lg w-2/3">
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama_produk">
                  Nama Produk
                </label>
                <input
                  type="text"
                  id="nama_produk"
                  name="nama_produk"
                  value={currentProduct.nama_produk}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="harga">
                    Harga (Rp)
                  </label>
                  <input
                    type="number"
                    id="harga"
                    name="harga"
                    value={currentProduct.harga}
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deskripsi">
                  Deskripsi
                </label>
                <textarea
                  id="deskripsi"
                  name="deskripsi"
                  value={currentProduct.deskripsi}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
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

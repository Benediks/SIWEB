"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { transactions as placeholderTransactions } from '@/lib/placeholder-data'; // Importing the placeholder transaction data
import { products } from '@/lib/placeholder-data'; // Importing products to access their prices

// Define TypeScript interfaces for better type safety
interface Transaction {
  id_transaksi: string; // Unique identifier
  id_produk: string;
  nama_pembeli: string;
  tanggal: Date; // Date type
  jumlah: number; // Added jumlah
  total_harga: number; // Total price
}

export default function DaftarTransaksi() {
  // Use the imported placeholder transaction data
  const [transactions, setTransactions] = useState<Transaction[]>(placeholderTransactions);

  // State for modal add/edit transaction
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction>({
    id_transaksi: "",
    id_produk: "",
    nama_pembeli: "",
    tanggal: new Date(), // Initialize with current date
    jumlah: 1, // Initialize jumlah
    total_harga: 0
  });

  // State for selected transaction detail view
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Select first transaction by default
  useEffect(() => {
    if (transactions.length > 0 && !selectedTransaction) {
      setSelectedTransaction(transactions[0]);
    }
  }, [transactions, selectedTransaction]);

  // Function to handle add transaction
  const handleAddTransaction = () => {
    setEditMode(false);
    setCurrentTransaction({
      id_transaksi: "",
      id_produk: "",
      nama_pembeli: "",
      tanggal: new Date(), // Set to current date
      jumlah: 1, // Set default jumlah
      total_harga: 0
    });
    setShowModal(true);
  };

  // Function to handle edit transaction
  const handleEditTransaction = (transaction: Transaction) => {
    setEditMode(true);
    setCurrentTransaction(transaction);
    setShowModal(true);
  };

  // Function to handle delete transaction
  const handleDeleteTransaction = (id_transaksi: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
      setTransactions(transactions.filter(transaction => transaction.id_transaksi !== id_transaksi));
      if (selectedTransaction && selectedTransaction.id_transaksi === id_transaksi) {
        setSelectedTransaction(null);
      }
    }
  };

  // Function to save transaction (both add and edit)
  const handleSaveTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Calculate total_harga based on jumlah and product price
    const product = products.find(p => p.id_produk === currentTransaction.id_produk);
    const total_harga = product ? currentTransaction.jumlah * product.harga : 0;

    if (editMode) {
      // Update existing transaction
      setTransactions(transactions.map(transaction => 
        transaction.id_transaksi === currentTransaction.id_transaksi ? { ...currentTransaction, total_harga } : transaction
      ));
      
      // Update selected transaction if it's being edited
      if (selectedTransaction && selectedTransaction.id_transaksi === currentTransaction.id_transaksi) {
        setSelectedTransaction({ ...currentTransaction, total_harga });
      }
    } else {
      // Add new transaction
      const newTransaction = {
        ...currentTransaction,
        total_harga, // Set calculated total_harga
        id_transaksi: `t000${transactions.length + 1}` // Generate new id_transaksi
      };
      setTransactions([...transactions, newTransaction]);
    }
    
    setShowModal(false);
  };

  // Function to handle input changes in form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentTransaction({
      ...currentTransaction,
      [name]: name === 'total_harga' ? Number(value) : value
    });
  };

  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = new Date(e.target.value);
    setCurrentTransaction({
      ...currentTransaction,
      tanggal: dateValue
    });
  };

  // Handle jumlah change
  const handleJumlahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const jumlahValue = Number(e.target.value);
    setCurrentTransaction({
      ...currentTransaction,
      jumlah: jumlahValue
    });
  };

  // Handle click on a transaction row to show details
  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
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
          <Link href="/admin/daftarproduk" className="block py-4 px-6 hover:bg-gray-600">
            Daftar Produk
          </Link>
          <Link href="/admin/daftartransaksi" className="block py-4 px-6 bg-gray-800 border-l-4 border-blue-500">
            Daftar Transaksi
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Daftar Transaksi</h1>
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

        {/* Transactions Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="flex justify-end mb-4">
            <button 
              onClick={handleAddTransaction}
              className="bg-black text-white px-4 py-2 rounded flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Tambah Transaksi
            </button>
          </div>

          {/* Transaction List and Details */}
          <div className="flex space-x-6">
            {/* Transactions List */}
            <div className="w-1/2">
              <div className="bg-white p-4 rounded shadow-sm mb-6">
                <div className="flex justify-between mb-4 text-gray-700 font-medium">
                  <div className="w-1/4">id_transaksi</div>
                  <div className="w-1/4">id_produk</div>
                  <div className="w-1/4">nama_pembeli</div>
                  <div className="w-1/4">jumlah</div>
                </div>
                {transactions.map((transaction) => (
                  <div 
                    key={transaction.id_transaksi} 
                    className={`flex justify-between items-center p-3 rounded cursor-pointer mb-2 ${selectedTransaction?.id_transaksi === transaction.id_transaksi ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
                    onClick={() => handleTransactionClick(transaction)}
                  >
                    <div className="w-1/4">{transaction.id_transaksi}</div>
                    <div className="w-1/4">{transaction.id_produk}</div>
                    <div className="w-1/4">{transaction.nama_pembeli}</div>
                    <div className="w-1/4">{transaction.jumlah}</div> {/* Display jumlah */}
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction Detail */}
            <div className="w-1/2">
              {selectedTransaction ? (
                <div className="bg-white p-4 rounded shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Detail Transaksi</h2>
                  <div className="border-b pb-4 mb-4">
                    <div className="grid grid-cols-2 gap-y-4">
                      <div>
                        <p className="text-sm text-gray-500">id_transaksi</p>
                        <p>{selectedTransaction.id_transaksi}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">tanggal</p>
                        <p>{selectedTransaction.tanggal.toLocaleDateString('id-ID')}</p> {/* Format date for display */}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">id_produk</p>
                        <p>{selectedTransaction.id_produk}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">nama_pembeli</p>
                        <p>{selectedTransaction.nama_pembeli}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">jumlah</p>
                        <p>{selectedTransaction.jumlah}</p> {/* Display jumlah */}
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <p className="text-sm text-gray-500">total_harga (Rp)</p>
                    <p className="text-lg font-semibold">{selectedTransaction.total_harga.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEditTransaction(selectedTransaction)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTransaction(selectedTransaction.id_transaksi)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-4 rounded shadow-sm h-32 flex items-center justify-center text-gray-500">
                  Pilih transaksi untuk melihat detail
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

      {/* Modal for Add/Edit Transaction */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-2/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{editMode ? 'Edit Transaksi' : 'Tambah Transaksi'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSaveTransaction}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_produk">
                    ID Produk
                  </label>
                  <input
                    type="text"
                    id="id_produk"
                    name="id_produk"
                    value={currentTransaction.id_produk}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tanggal">
                    Tanggal
                  </label>
                  <input
                    type="date" // Changed to date input type
                    id="tanggal"
                    name="tanggal"
                    value={currentTransaction.tanggal.toISOString().split('T')[0]} // Format date for input
                    onChange={handleDateChange} // Use the new date change handler
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama_pembeli">
                  Nama Pembeli
                </label>
                <input
                  type="text"
                  id="nama_pembeli"
                  name="nama_pembeli"
                  value={currentTransaction.nama_pembeli}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jumlah">
                  Jumlah
                </label>
                <input
                  type="number"
                  id="jumlah"
                  name="jumlah"
                  value={currentTransaction.jumlah}
                  onChange={handleJumlahChange} // Use the new jumlah change handler
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="total_harga">
                  Total Harga (Rp)
                </label>
                <input
                  type="number"
                  id="total_harga"
                  name="total_harga"
                  value={currentTransaction.total_harga}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  readOnly // Make this read-only as it will be calculated
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

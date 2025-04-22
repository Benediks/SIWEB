"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Define TypeScript interfaces for better type safety
interface TransactionItem {
  name: string;
  quantity: number;
  price: number;
}

interface Transaction {
  id: string;
  date: string;
  status: string;
  totalPrice: number;
  tax: number;
  productPrice: number;
  payment: string;
  items: TransactionItem[];
}

export default function DaftarTransaksi() {
  // Sample transaction data
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "nfcbde123321",
      date: "Hari ini, 12:00",
      status: "Dalam Pengantaran",
      totalPrice: 880000.00,
      tax: 80000.00,
      productPrice: 800000.00,
      payment: "Bank BCA",
      items: [
        {
          name: "TDR-3000",
          quantity: 1,
          price: 800000.00
        }
      ]
    },
    {
      id: "nfcbde123322",
      date: "Kemarin, 13:00",
      status: "Selesai",
      totalPrice: 1760000.00,
      tax: 160000.00,
      productPrice: 1600000.00,
      payment: "Bank Mandiri",
      items: [
        {
          name: "TDR-3000",
          quantity: 2,
          price: 1600000.00
        }
      ]
    },
    {
      id: "nfcbde123333",
      date: "Hari ini, 13:54",
      status: "Menunggu Pembayaran",
      totalPrice: 880000.00,
      tax: 80000.00,
      productPrice: 800000.00,
      payment: "Pending",
      items: [
        {
          name: "TDR-3000",
          quantity: 1,
          price: 800000.00
        }
      ]
    },
    {
      id: "nfcbasc3321",
      date: "Hari ini, 11:00",
      status: "Dibatalkan",
      totalPrice: 1320000.00,
      tax: 120000.00,
      productPrice: 1200000.00,
      payment: "Dibatalkan",
      items: [
        {
          name: "TDR-3000",
          quantity: 1,
          price: 800000.00
        },
        {
          name: "TDR-1500",
          quantity: 1,
          price: 400000.00
        }
      ]
    }
  ]);

  // State for selected transaction
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // State for modal and new transaction
  const [showModal, setShowModal] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction>({
    id: "",
    date: "",
    status: "Menunggu Pembayaran",
    totalPrice: 0,
    tax: 0,
    productPrice: 0,
    payment: "",
    items: [
      {
        name: "",
        quantity: 1,
        price: 0
      }
    ]
  });

  // Function to select a transaction
  const handleSelectTransaction = (transactionId: string) => {
    const transaction = transactions.find(t => t.id === transactionId);
    if (transaction) {
      setSelectedTransaction(transaction);
    }
  };

  // Function to show add transaction modal
  const handleAddTransaction = () => {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

    setCurrentTransaction({
      id: `nfcbde${Math.floor(100000 + Math.random() * 900000)}`,
      date: `Hari ini, ${formattedTime}`,
      status: "Menunggu Pembayaran",
      totalPrice: 0,
      tax: 0,
      productPrice: 0,
      payment: "",
      items: [
        {
          name: "",
          quantity: 1,
          price: 0
        }
      ]
    });
    setShowModal(true);
  };

  // Function to handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "productPrice") {
      const productPrice = Number(value);
      const tax = Math.round(productPrice * 0.1); // 10% tax
      const totalPrice = productPrice + tax;
      
      setCurrentTransaction({
        ...currentTransaction,
        productPrice,
        tax,
        totalPrice
      });
    } else {
      setCurrentTransaction({
        ...currentTransaction,
        [name]: value
      });
    }
  };

  // Function to handle item changes
  const handleItemChange = (index: number, field: keyof TransactionItem, value: string | number) => {
    const updatedItems = [...currentTransaction.items];
    
    if (field === "price" || field === "quantity") {
      updatedItems[index][field] = Number(value);
    } else {
      updatedItems[index][field] = value as string;
    }
    
    // Recalculate product price based on items
    const productPrice = updatedItems.reduce((sum, item) => sum + item.price, 0);
    const tax = Math.round(productPrice * 0.1); // 10% tax
    const totalPrice = productPrice + tax;
    
    setCurrentTransaction({
      ...currentTransaction,
      items: updatedItems,
      productPrice,
      tax,
      totalPrice
    });
  };

  // Function to add an item
  const handleAddItem = () => {
    setCurrentTransaction({
      ...currentTransaction,
      items: [
        ...currentTransaction.items,
        {
          name: "",
          quantity: 1,
          price: 0
        }
      ]
    });
  };

  // Function to remove an item
  const handleRemoveItem = (index: number) => {
    if (currentTransaction.items.length > 1) {
      const updatedItems = currentTransaction.items.filter((_, i) => i !== index);
      
      // Recalculate product price
      const productPrice = updatedItems.reduce((sum, item) => sum + item.price, 0);
      const tax = Math.round(productPrice * 0.1); // 10% tax
      const totalPrice = productPrice + tax;
      
      setCurrentTransaction({
        ...currentTransaction,
        items: updatedItems,
        productPrice,
        tax,
        totalPrice
      });
    }
  };

  // Function to save transaction
  const handleSaveTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTransactions([...transactions, currentTransaction]);
    setShowModal(false);
    // Optionally select the new transaction
    setSelectedTransaction(currentTransaction);
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
            {/* Transaction List */}
            <div className="w-1/2">
              <div className="bg-white p-4 rounded shadow-sm mb-6">
                <div className="flex justify-between mb-4 text-gray-700 font-medium">
                  <div className="w-1/2">Tanggal & waktu</div>
                  <div className="w-1/2">ID Pesanan</div>
                </div>
                {transactions.map(transaction => (
                  <div 
                    key={transaction.id} 
                    className={`flex justify-between items-center p-3 rounded cursor-pointer mb-2 ${selectedTransaction?.id === transaction.id ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
                    onClick={() => handleSelectTransaction(transaction.id)}
                  >
                    <div className="w-1/2">{transaction.date}</div>
                    <div className="w-1/2 text-blue-500 underline">{transaction.id}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction Details */}
            <div className="w-1/2">
              {selectedTransaction ? (
                <div className="bg-white p-4 rounded shadow-sm">
                  <div className="border-b pb-4 mb-4">
                    <h2 className="text-xl font-semibold mb-4">Detail Transaksi</h2>
                    <div className="grid grid-cols-2 gap-y-4">
                      <div>
                        <p className="text-sm text-gray-500">ID Pesanan</p>
                        <p>{selectedTransaction.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Tanggal dan waktu</p>
                        <p>{selectedTransaction.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Pendapatan kotor</p>
                        <p>Rp {selectedTransaction.totalPrice.toLocaleString('id-ID')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p>{selectedTransaction.status}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Pembayaran</p>
                        <p>{selectedTransaction.payment}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-b pb-4 mb-4">
                    <h2 className="text-xl font-semibold mb-4">Detail Pembayaran</h2>
                    <div className="grid grid-cols-2 gap-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Harga Barang</p>
                        <p>Rp {selectedTransaction.productPrice.toLocaleString('id-ID')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Pajak</p>
                        <p>Rp {selectedTransaction.tax.toLocaleString('id-ID')}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Total biaya</p>
                        <p>Rp {selectedTransaction.totalPrice.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Riwayat Rincian Pembayaran</h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-4">Rincian Barang</th>
                            <th className="text-left py-2 px-4">Jumlah Barang</th>
                            <th className="text-right py-2 px-4">Harga</th>
                            <th className="text-right py-2 px-4">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedTransaction.items.map((item, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-2 px-4">{item.name}</td>
                              <td className="py-2 px-4">{item.quantity}</td>
                              <td className="py-2 px-4 text-right">{(item.price / item.quantity).toLocaleString('id-ID')}</td>
                              <td className="py-2 px-4 text-right">{item.price.toLocaleString('id-ID')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-4 rounded shadow-sm h-32 flex items-center justify-center text-gray-500">
                  Pilih ID Pesanan untuk melihat detail transaksi
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

      {/* Modal for Add Transaction */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-2/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Tambah Transaksi</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSaveTransaction}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
                    ID Pesanan
                  </label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    value={currentTransaction.id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    readOnly
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                    Tanggal & Waktu
                  </label>
                  <input
                    type="text"
                    id="date"
                    name="date"
                    value={currentTransaction.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    readOnly
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={currentTransaction.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                    <option value="Dalam Pengantaran">Dalam Pengantaran</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Dibatalkan">Dibatalkan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="payment">
                    Metode Pembayaran
                  </label>
                  <select
                    id="payment"
                    name="payment"
                    value={currentTransaction.payment}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Pilih Metode Pembayaran</option>
                    <option value="Bank BCA">Bank BCA</option>
                    <option value="Bank Mandiri">Bank Mandiri</option>
                    <option value="Bank BNI">Bank BNI</option>
                    <option value="Bank BRI">Bank BRI</option>
                    <option value="Pending">Pending</option>
                    <option value="Dibatalkan">Dibatalkan</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Items</h3>
                  <button 
                    type="button" 
                    onClick={handleAddItem}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    + Tambah Item
                  </button>
                </div>
                
                {currentTransaction.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2 p-2 border border-gray-200 rounded">
                    <div className="flex-1">
                      <label className="block text-gray-700 text-xs mb-1" htmlFor={`item-name-${index}`}>
                        Nama Produk
                      </label>
                      <input
                        type="text"
                        id={`item-name-${index}`}
                        value={item.name}
                        onChange={(e) => handleItemChange(index, "name", e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                        placeholder="Nama produk"
                        required
                      />
                    </div>
                    <div className="w-24">
                      <label className="block text-gray-700 text-xs mb-1" htmlFor={`item-quantity-${index}`}>
                        Jumlah
                      </label>
                      <input
                        type="number"
                        id={`item-quantity-${index}`}
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                        min="1"
                        required
                      />
                    </div>
                    <div className="w-32">
                      <label className="block text-gray-700 text-xs mb-1" htmlFor={`item-price-${index}`}>
                        Harga Total
                      </label>
                      <input
                        type="number"
                        id={`item-price-${index}`}
                        value={item.price}
                        onChange={(e) => handleItemChange(index, "price", e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                        min="0"
                        required
                      />
                    </div>
                    {currentTransaction.items.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => handleRemoveItem(index)}
                        className="self-end text-red-500 hover:text-red-700 mt-5"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productPrice">
                    Harga Barang (Rp)
                  </label>
                  <input
                    type="number"
                    id="productPrice"
                    name="productPrice"
                    value={currentTransaction.productPrice}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tax">
                    Pajak (Rp)
                  </label>
                  <input
                    type="number"
                    id="tax"
                    name="tax"
                    value={currentTransaction.tax}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalPrice">
                    Total (Rp)
                  </label>
                  <input
                    type="number"
                    id="totalPrice"
                    name="totalPrice"
                    value={currentTransaction.totalPrice}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 font-bold"
                    readOnly
                  />
                </div>
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
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
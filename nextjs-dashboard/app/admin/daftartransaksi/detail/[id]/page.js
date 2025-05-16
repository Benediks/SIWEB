'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TransactionDetail({ params }) {
  const transactionId = params.id;
  const [transaction, setTransaction] = useState(null);
  const [transactionItems, setTransactionItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch transaction data
  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        // Fetch transaction details
        const transactionResponse = await fetch(`/api/transactions/${transactionId}`);
        if (!transactionResponse.ok) {
          throw new Error('Failed to fetch transaction');
        }
        const transactionData = await transactionResponse.json();
        setTransaction(transactionData);

        // Fetch transaction items
        const itemsResponse = await fetch(`/api/transactions/${transactionId}/items`);
        if (!itemsResponse.ok) {
          throw new Error('Failed to fetch transaction items');
        }
        const itemsData = await itemsResponse.json();
        setTransactionItems(itemsData);

        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchTransactionData();
  }, [transactionId]);

  // Handle status update
  const handleUpdateStatus = async (newStatus) => {
    try {
      const response = await fetch(`/api/transactions/${transactionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...transaction,
          status: newStatus
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update transaction status');
      }

      // Update the transaction in state
      setTransaction({
        ...transaction,
        status: newStatus
      });
    } catch (error) {
      alert(error.message);
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Helper function to get status badge styling
  const getStatusBadgeClass = (status) => {
    switch(status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
          <h1 className="text-2xl font-bold">Transaction Detail</h1>
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

        {/* Transaction Detail Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="mb-4">
            <button
              onClick={() => router.push('/admin/daftartransaksi')}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Transactions
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-10">Loading transaction details...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : transaction ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Transaction Header */}
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Transaction #{transaction.id_transaksi}</h2>
                    <p className="text-gray-600 mt-1">
                      Date: {formatDate(transaction.tanggal)}
                    </p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusBadgeClass(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
                
                {/* Status update buttons */}
                <div className="mt-4 flex space-x-2">
                  <button 
                    onClick={() => handleUpdateStatus('Pending')} 
                    className={`px-3 py-1 border rounded ${transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                  >
                    Pending
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus('Completed')} 
                    className={`px-3 py-1 border rounded ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800 border-green-300' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                  >
                    Completed
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus('Cancelled')} 
                    className={`px-3 py-1 border rounded ${transaction.status === 'Cancelled' ? 'bg-red-100 text-red-800 border-red-300' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                  >
                    Cancelled
                  </button>
                </div>
              </div>

              {/* Customer Information */}
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{transaction.nama_pelanggan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{transaction.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{transaction.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium">{transaction.alamat || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Order Items</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactionItems.length > 0 ? (
                        transactionItems.map((item) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 relative">
                                  <Image
                                    src={item.image || "/images/placeholder.png"}
                                    alt={item.nama_produk}
                                    width={40}
                                    height={40}
                                    className="rounded"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{item.nama_produk}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                              Rp {item.harga.toLocaleString('id-ID')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                              {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                              Rp {(item.harga * item.quantity).toLocaleString('id-ID')}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                            No items found for this transaction
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-6">
                <div className="flex justify-end">
                  <div className="w-full max-w-md">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">Rp {transaction.total.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">Rp 0</span>
                    </div>
                    <div className="flex justify-between py-2 border-t border-gray-200 font-bold">
                      <span>Total</span>
                      <span>Rp {transaction.total.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">Transaction not found</div>
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
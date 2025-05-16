import Image from 'next/image';
import Link from 'next/link';
import { fetchDashboardData } from '@/lib/db';

export default async function Dashboard() {
  // Fetch dashboard data from the database
  const { totalProducts, totalTransactions, totalRevenue, bestSellingProduct } = await fetchDashboardData();

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
          <Link href="/admin/dashboard" className="block py-4 px-6 bg-gray-800 border-l-4 border-blue-500">
            Dashboard
          </Link>
          <Link href="/admin/daftarproduk" className="block py-4 px-6 hover:bg-gray-600">
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
          <h1 className="text-2xl font-bold">Dashboard</h1>
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

        {/* Dashboard Content */}
        <main className="flex-1 p-6 bg-gray-100">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Total Products Card */}
            <div className="bg-gray-200 p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-6">Total Produk</h2>
              <div className="flex justify-center">
                <span className="text-6xl font-bold">{totalProducts}</span>
              </div>
            </div>
            
            {/* Total Transactions Card */}
            <div className="bg-gray-200 p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-6">Total Transaksi</h2>
              <div className="flex justify-center">
                <span className="text-6xl font-bold">{totalTransactions}</span>
              </div>
            </div>

            {/* Total Revenue Card */}
            <div className="bg-gray-200 p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-6">Total Revenue</h2>
              <div className="flex justify-center">
                <span className="text-4xl font-bold">Rp {totalRevenue.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          {/* Best Selling Product Card */}
          {bestSellingProduct && (
            <div className="bg-gray-200 p-6 rounded shadow mb-6">
              <h2 className="text-xl font-semibold mb-4">Produk Terlaris</h2>
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-bold">{bestSellingProduct.nama_produk}</p>
                  <p className="text-sm text-gray-500">Total Penjualan: {bestSellingProduct.total_sales}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">Rp {bestSellingProduct.harga.toLocaleString('id-ID')}</p>
                </div>
              </div>
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
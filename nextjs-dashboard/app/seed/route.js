import { NextResponse } from 'next/server';
import { sql } from 'postgres';
import { products, transactions } from '@/lib/placeholder-data.js';

export async function GET(request) {
  try {
    // Create products table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id_produk VARCHAR(255) PRIMARY KEY,
        nama_produk VARCHAR(255) NOT NULL,
        harga INTEGER NOT NULL,
        stock INTEGER NOT NULL,
        deskripsi TEXT,
        image VARCHAR(255),
        sales INTEGER
      );
    `;

    // Create transactions table with foreign key
    await sql`
      CREATE TABLE IF NOT EXISTS transactions (
        id_transaksi VARCHAR(255) PRIMARY KEY,
        id_produk VARCHAR(255) NOT NULL,
        nama_pembeli VARCHAR(255) NOT NULL,
        tanggal DATE NOT NULL,
        jumlah INTEGER NOT NULL,
        total_harga INTEGER NOT NULL,
        FOREIGN KEY (id_produk) REFERENCES products(id_produk)
      );
    `;

    // Insert products
    const insertedProducts = await Promise.all(
      products.map(async (product) => {
        return sql`
          INSERT INTO products (id_produk, nama_produk, harga, stock, deskripsi, image, sales)
          VALUES (${product.id_produk}, ${product.nama_produk}, ${product.harga}, ${product.stock}, ${product.deskripsi}, ${product.image}, ${product.sales})
          ON CONFLICT (id_produk) DO NOTHING;
        `;
      })
    );

    // Insert transactions
    const insertedTransactions = await Promise.all(
      transactions.map(async (transaction) => {
        return sql`
          INSERT INTO transactions (id_transaksi, id_produk, nama_pembeli, tanggal, jumlah, total_harga)
          VALUES (${transaction.id_transaksi}, ${transaction.id_produk}, ${transaction.nama_pembeli}, ${transaction.tanggal.toISOString().split('T')[0]}, ${transaction.jumlah}, ${transaction.total_harga})
          ON CONFLICT (id_transaksi) DO NOTHING;
        `;
      })
    );

    return NextResponse.json({ 
      message: 'Database seeded successfully!',
      products: insertedProducts.length,
      transactions: insertedTransactions.length
    }, { status: 200 });
  } catch (error) {
    console.error('Error seeding the database:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
const { db } = require('@vercel/postgres');
const { products, transactions } = require('../lib/placeholder-data.js');

async function seedProducts(client) {
  try {
    // Create the "products" table if it doesn't exist
    await client.sql`
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

    console.log(`Created "products" table`);

    // Insert data into the "products" table
    const insertedProducts = await Promise.all(
      products.map(async (product) => {
        return client.sql`
          INSERT INTO products (id_produk, nama_produk, harga, stock, deskripsi, image, sales)
          VALUES (${product.id_produk}, ${product.nama_produk}, ${product.harga}, ${product.stock}, ${product.deskripsi}, ${product.image}, ${product.sales})
          ON CONFLICT (id_produk) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedProducts.length} products`);
    
    return {
      products: insertedProducts,
    };
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
}

async function seedTransactions(client) {
  try {
    // Create the "transactions" table if it doesn't exist
    await client.sql`
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

    console.log(`Created "transactions" table`);

    // Insert data into the "transactions" table
    const insertedTransactions = await Promise.all(
      transactions.map(async (transaction) => {
        return client.sql`
          INSERT INTO transactions (id_transaksi, id_produk, nama_pembeli, tanggal, jumlah, total_harga)
          VALUES (${transaction.id_transaksi}, ${transaction.id_produk}, ${transaction.nama_pembeli}, ${transaction.tanggal.toISOString().split('T')[0]}, ${transaction.jumlah}, ${transaction.total_harga})
          ON CONFLICT (id_transaksi) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedTransactions.length} transactions`);
    
    return {
      transactions: insertedTransactions,
    };
  } catch (error) {
    console.error('Error seeding transactions:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedProducts(client);
  await seedTransactions(client);

  await client.end();
}

main().catch((err) => {
  console.error('An error occurred while seeding the database:', err);
  process.exit(1);
});
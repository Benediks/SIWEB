import { sql } from 'postgres'

export async function fetchAllProducts() {
  try {
    const products = await sql`SELECT * FROM products`;
    return products.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products data.');
  }
}

export async function fetchProductById(id) {
  try {
    const product = await sql`
      SELECT * FROM products WHERE id_produk = ${id}
    `;
    return product.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}

export async function updateProduct(product) {
  try {
    const result = await sql`
      UPDATE products
      SET nama_produk = ${product.nama_produk},
          harga = ${product.harga},
          stock = ${product.stock},
          deskripsi = ${product.deskripsi},
          image = ${product.image},
          sales = ${product.sales}
      WHERE id_produk = ${product.id_produk}
      RETURNING *
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update product.');
  }
}

export async function createProduct(product) {
  // Generate a new ID for the product
  const nextId = await getNextProductId();
  
  try {
    const result = await sql`
      INSERT INTO products (id_produk, nama_produk, harga, stock, deskripsi, image, sales)
      VALUES (${nextId}, ${product.nama_produk}, ${product.harga}, ${product.stock}, ${product.deskripsi}, ${product.image}, ${product.sales || 0})
      RETURNING *
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create product.');
  }
}

export async function deleteProduct(id) {
  try {
    // Check if there are any transactions with this product
    const transactions = await sql`
      SELECT COUNT(*) FROM transactions WHERE id_produk = ${id}
    `;
    
    if (transactions.rows[0].count > 0) {
      throw new Error('Cannot delete product with existing transactions.');
    }
    
    await sql`DELETE FROM products WHERE id_produk = ${id}`;
    return { success: true };
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
}

export async function fetchAllTransactions() {
  try {
    const transactions = await sql`
      SELECT t.*, p.nama_produk 
      FROM transactions t
      JOIN products p ON t.id_produk = p.id_produk
    `;
    
    // Convert date format to be compatible with the frontend
    return transactions.rows.map(transaction => ({
      ...transaction,
      tanggal: new Date(transaction.tanggal)
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch transactions data.');
  }
}

export async function fetchTransactionById(id) {
  try {
    const transaction = await sql`
      SELECT t.*, p.nama_produk 
      FROM transactions t
      JOIN products p ON t.id_produk = p.id_produk
      WHERE t.id_transaksi = ${id}
    `;
    
    if (transaction.rows.length === 0) {
      return null;
    }
    
    // Convert date format
    return {
      ...transaction.rows[0],
      tanggal: new Date(transaction.rows[0].tanggal)
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch transaction.');
  }
}

export async function createTransaction(transaction) {
  const nextId = await getNextTransactionId();
  
  try {
    // Get product price for calculating total_harga
    const product = await fetchProductById(transaction.id_produk);
    if (!product) {
      throw new Error('Product not found');
    }
    
    // Calculate total price
    const total_harga = product.harga * transaction.jumlah;
    
    const result = await sql`
      INSERT INTO transactions (id_transaksi, id_produk, nama_pembeli, tanggal, jumlah, total_harga)
      VALUES (${nextId}, ${transaction.id_produk}, ${transaction.nama_pembeli}, ${transaction.tanggal}, ${transaction.jumlah}, ${total_harga})
      RETURNING *
    `;
    
    // Update product stock
    await sql`
      UPDATE products
      SET stock = stock - ${transaction.jumlah}
      WHERE id_produk = ${transaction.id_produk}
    `;
    
    return {
      ...result.rows[0],
      tanggal: new Date(result.rows[0].tanggal)
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create transaction.');
  }
}

export async function updateTransaction(transaction) {
  try {
    // Get product price for calculating total_harga
    const product = await fetchProductById(transaction.id_produk);
    if (!product) {
      throw new Error('Product not found');
    }
    
    // Calculate total price
    const total_harga = product.harga * transaction.jumlah;
    
    const result = await sql`
      UPDATE transactions
      SET id_produk = ${transaction.id_produk},
          nama_pembeli = ${transaction.nama_pembeli},
          tanggal = ${transaction.tanggal},
          jumlah = ${transaction.jumlah},
          total_harga = ${total_harga}
      WHERE id_transaksi = ${transaction.id_transaksi}
      RETURNING *
    `;
    
    return {
      ...result.rows[0],
      tanggal: new Date(result.rows[0].tanggal)
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update transaction.');
  }
}

export async function deleteTransaction(id) {
  try {
    await sql`DELETE FROM transactions WHERE id_transaksi = ${id}`;
    return { success: true };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete transaction.');
  }
}

// Helper functions for generating IDs
async function getNextProductId() {
  try {
    const result = await sql`
      SELECT id_produk FROM products 
      ORDER BY id_produk DESC 
      LIMIT 1
    `;
    
    if (result.rows.length > 0) {
      const lastId = result.rows[0].id_produk;
      const numPart = parseInt(lastId.substring(1), 10);
      return `p${String(numPart + 1).padStart(4, '0')}`;
    }
    
    return 'p0001'; // If no products exist yet
  } catch (error) {
    console.error('Error getting next product ID:', error);
    throw error;
  }
}

async function getNextTransactionId() {
  try {
    const result = await sql`
      SELECT id_transaksi FROM transactions 
      ORDER BY id_transaksi DESC 
      LIMIT 1
    `;
    
    if (result.rows.length > 0) {
      const lastId = result.rows[0].id_transaksi;
      const numPart = parseInt(lastId.substring(1), 10);
      return `t${String(numPart + 1).padStart(4, '0')}`;
    }
    
    return 't0001'; // If no transactions exist yet
  } catch (error) {
    console.error('Error getting next transaction ID:', error);
    throw error;
  }
}

export async function fetchDashboardData() {
  try {
    // Get total products
    const productsResult = await sql`SELECT COUNT(*) FROM products`;
    const totalProducts = parseInt(productsResult.rows[0].count);
    
    // Get total transactions
    const transactionsResult = await sql`SELECT COUNT(*) FROM transactions`;
    const totalTransactions = parseInt(transactionsResult.rows[0].count);
    
    // Calculate total revenue
    const revenueResult = await sql`SELECT SUM(total_harga) FROM transactions`;
    const totalRevenue = parseInt(revenueResult.rows[0].sum || 0);
    
    // Find best selling product
    const bestSellingResult = await sql`
      SELECT p.*, SUM(t.jumlah) as total_sales
      FROM products p
      JOIN transactions t ON p.id_produk = t.id_produk
      GROUP BY p.id_produk
      ORDER BY total_sales DESC
      LIMIT 1
    `;
    
    const bestSellingProduct = bestSellingResult.rows.length > 0 
      ? bestSellingResult.rows[0] 
      : null;
    
    return {
      totalProducts,
      totalTransactions,
      totalRevenue,
      bestSellingProduct
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch dashboard data.');
  }
}
// Converted from placeholder-data.ts for database seeding

const products = [
  {
    id_produk: "p0001",
    nama_produk: "TDR-3000",
    harga: 800000,
    stock: 100,
    deskripsi: "Ditempa dan dirakit oleh kuli Ngawi dengan penuh cinta",
    image: "/images/toko1.png",
    sales: 1
  },
  {
    id_produk: "p0002",
    nama_produk: "TDR-4090",
    harga: 100000,
    stock: 50,
    deskripsi: "Kuat dan Berenergi",
    image: "/images/toko2.png",
    sales: 2 
  },
  {
    id_produk: "p0003",
    nama_produk: "TDR-5070",
    harga: 200000,
    stock: 75,
    deskripsi: "Lorem ipsum si dolor amet",
    image: "/images/toko3.png",
    sales: 3 
  },
  {
    id_produk: "p0004",
    nama_produk: "TDR-1080",
    harga: 50000,
    stock: 120,
    deskripsi: "nishi nei ... nei ... nei nei",
    image: "/images/toko4.png",
    sales: 1 
  },
  {
    id_produk: "p0005",
    nama_produk: "TDR-2000",
    harga: 100000,
    stock: 200,
    deskripsi: "Cool eletric thing!",
    image: "/images/toko5.png",
    sales: 4 
  },
];

// Convert dates to JS Date objects for database compatibility
const transactions = [
  {
    id_transaksi: "t0001",
    id_produk: "p0001",
    nama_pembeli: "David Coggins",
    tanggal: new Date("2025-01-01"),
    jumlah: 1,
    total_harga: 800000,
  },
  {
    id_transaksi: "t0002",
    id_produk: "p0002",
    nama_pembeli: "Kevin Andreana", 
    tanggal: new Date("2025-01-02"),
    jumlah: 2,
    total_harga: 200000,
  },
  {
    id_transaksi: "t0003",
    id_produk: "p0003",
    nama_pembeli: "Miselia Ikwan",
    tanggal: new Date("2025-01-03"),
    jumlah: 3,
    total_harga: 2700000,
  },
  {
    id_transaksi: "t0004",
    id_produk: "p0004",
    nama_pembeli: "Owi",
    tanggal: new Date("2025-01-04"),
    jumlah: 1,
    total_harga: 50000,
  },
  {
    id_transaksi: "t0005",
    id_produk: "p0005",
    nama_pembeli: "Owo",
    tanggal: new Date("2025-01-05"),
    jumlah: 4,
    total_harga: 400000,
  }
];

module.exports = {
  products,
  transactions
};
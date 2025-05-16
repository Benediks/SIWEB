import { NextResponse } from 'next/server';
import { 
  fetchAllProducts, 
  fetchProductById, 
  createProduct,
  updateProduct,
  deleteProduct
} from '@/lib/db';

// GET all products
export async function GET(request) {
  try {
    const products = await fetchAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new product
export async function POST(request) {
  try {
    const body = await request.json();
    const newProduct = await createProduct(body);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
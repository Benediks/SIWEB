import { NextResponse } from 'next/server';
import { 
  fetchProductById, 
  updateProduct,
  deleteProduct
} from '@/lib/db';

// GET a specific product
export async function GET(request, { params }) {
  try {
    const product = await fetchProductById(params.id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT (update) a product
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const updatedProduct = await updateProduct({
      ...body,
      id_produk: params.id
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE a product
export async function DELETE(request, { params }) {
  try {
    await deleteProduct(params.id);
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { fetchTransactionItemsById } from '@/lib/db';

// GET transaction items for a specific transaction
export async function GET(request, { params }) {
  try {
    const items = await fetchTransactionItemsById(params.id);
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
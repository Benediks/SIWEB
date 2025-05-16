import { NextResponse } from 'next/server';
import {
  fetchTransactionById,
  updateTransaction,
  deleteTransaction
} from '@/lib/db';

// GET a specific transaction
export async function GET(request, { params }) {
  try {
    const transaction = await fetchTransactionById(params.id);
    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT (update) a transaction
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const updatedTransaction = await updateTransaction({
      ...body,
      id_transaksi: params.id
    });
    return NextResponse.json(updatedTransaction);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE a transaction
export async function DELETE(request, { params }) {
  try {
    await deleteTransaction(params.id);
    return NextResponse.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
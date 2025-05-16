import { NextResponse } from 'next/server';
import { 
  fetchAllTransactions, 
  createTransaction
} from '@/lib/db';

// GET all transactions
export async function GET(request) {
  try {
    const transactions = await fetchAllTransactions();
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new transaction
export async function POST(request) {
  try {
    const body = await request.json();
    const newTransaction = await createTransaction(body);
    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
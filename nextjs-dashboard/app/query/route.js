import { NextResponse } from 'next/server';
import { sql } from 'postgres';

export async function GET() {
  try {
    const products = await sql`SELECT * FROM products`;
    const transactions = await sql`SELECT * FROM transactions`;
    
    return NextResponse.json({ 
      products: products.rows,
      transactions: transactions.rows
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
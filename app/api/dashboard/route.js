import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const totalProducts = await pool.query(
      "SELECT COUNT(*) FROM products"
    );

    const totalStock = await pool.query(
      "SELECT SUM(stock) FROM products"
    );

    const receiptsToday = await pool.query(
      `SELECT COUNT(*) FROM receipts
       WHERE DATE(received_at) = CURRENT_DATE`
    );

    const deliveriesToday = await pool.query(
      `SELECT COUNT(*) FROM deliveries
       WHERE DATE(delivered_at) = CURRENT_DATE`
    );

    return NextResponse.json({
      total_products: totalProducts.rows[0].count,
      total_stock: totalStock.rows[0].sum,
      receipts_today: receiptsToday.rows[0].count,
      deliveries_today: deliveriesToday.rows[0].count
    });

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { product_id, quantity } = await req.json();

  try {
    // Insert receipt record
    await pool.query(
      `INSERT INTO receipts (product_id, quantity)
       VALUES ($1,$2)`,
      [product_id, quantity]
    );

    // Increase stock
    await pool.query(
      `UPDATE products
       SET stock = stock + $1
       WHERE id = $2`,
      [quantity, product_id]
    );

    return NextResponse.json({ message: "Stock added successfully" });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
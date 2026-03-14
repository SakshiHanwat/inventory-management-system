import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await pool.query("SELECT * FROM products");
  return NextResponse.json(result.rows);
}

export async function POST(req) {
  const { name, sku, category, unit, stock } = await req.json();

  const result = await pool.query(
    `INSERT INTO products (name, sku, category, unit, stock)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [name, sku, category, unit, stock]
  );

  return NextResponse.json(result.rows[0]);
}
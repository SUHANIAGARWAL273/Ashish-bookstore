import { pool } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("BODY RECEIVED:", body);

    const result = await pool.query(
      `INSERT INTO orders
      (name, email, phone, address, city, state, pincode, payment_id, amount, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        body.name,
        body.email,
        body.phone,
        body.address,
        body.city,
        body.state,
        body.pincode,
        body.payment_id,
        900,
        "paid",
      ]
    );

    console.log("RDS INSERT DATA:", result.rows);

    return Response.json({
      success: true,
      data: result.rows,
    });

  } catch (error) {
    console.error("RDS INSERT ERROR:", error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
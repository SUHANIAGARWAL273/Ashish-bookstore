import { supabase } from "@/lib/supabase";

export async function POST(req) {
  const body = await req.json();

  console.log("BODY RECEIVED:", body);

  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        city: body.city,
        state: body.state,
        pincode: body.pincode,
        payment_id: body.payment_id,
        amount: 900,
        status: "paid",
      },
    ])
    .select();

  console.log("INSERT DATA:", data);
  console.log("INSERT ERROR:", error);

  return Response.json({
    success: true,
    data,
    error,
  });
}
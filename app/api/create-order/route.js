import Razorpay from "razorpay";

export async function POST() {

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const order = await razorpay.orders.create({
    amount: 90000,
    currency: "INR",
  });

  return Response.json({
    orderId: order.id,
    amount: order.amount,
    key: process.env.RAZORPAY_KEY_ID,
  });
}
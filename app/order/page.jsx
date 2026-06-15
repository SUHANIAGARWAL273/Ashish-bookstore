"use client";

import { useState } from "react";

export default function OrderPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  async function payNow() {
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    const options = {
      key: data.key,
      amount: data.amount,
      currency: "INR",
      name: "Gold Standard Notes",
      description: "Physiology Notes",
      order_id: data.orderId,

      handler: async function (response) {
        await fetch("/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            payment_id: response.razorpay_payment_id,
          }),
        });

        window.location.href = "/success";
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  }

  return (
    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Order Now
      </h1>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="border p-3 w-full mb-3"
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="border p-3 w-full mb-3"
      />

      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        className="border p-3 w-full mb-3"
      />

      <textarea
        name="address"
        placeholder="Address"
        onChange={handleChange}
        className="border p-3 w-full mb-3"
      />

      <input
        name="city"
        placeholder="City"
        onChange={handleChange}
        className="border p-3 w-full mb-3"
      />

      <input
        name="state"
        placeholder="State"
        onChange={handleChange}
        className="border p-3 w-full mb-3"
      />

      <input
        name="pincode"
        placeholder="Pincode"
        onChange={handleChange}
        className="border p-3 w-full mb-3"
      />

      <button
        onClick={payNow}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Pay ₹900
      </button>
    </div>
  );
}
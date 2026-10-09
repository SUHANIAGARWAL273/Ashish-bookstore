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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  async function payNow() {
    if (loading) return;

    // Validate all fields
    const emptyField = Object.values(form).some(
      (value) => !value.trim()
    );

    if (emptyField) {
      alert("Please fill in all the details.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create Razorpay order
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.orderId || !data.key) {
        throw new Error(
          data.error || "Could not create payment order."
        );
      }

      if (!window.Razorpay) {
        throw new Error("Razorpay checkout could not load. Please refresh the page.");
      }

      // Step 2: Open Razorpay checkout
      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        name: "Gold Standard Notes",
        description: "Physiology Notes",
        order_id: data.orderId,

        handler: async function (response) {
          try {
            // Step 3: Save order in RDS
            const dbResponse = await fetch(
              "/api/verify-payment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...form,
                  payment_id: response.razorpay_payment_id,
                }),
              }
            );

            const dbResult = await dbResponse.json();

            console.log(
              "Database API status:",
              dbResponse.status
            );
            console.log(
              "Database API result:",
              dbResult
            );

            if (!dbResponse.ok || !dbResult.success) {
              console.error(
                "Order saving failed:",
                dbResult
              );

              alert(
                "Payment was completed, but saving your order failed. Please contact support with your payment ID: " +
                  response.razorpay_payment_id
              );

              return;
            }

            // Step 4: Continue only after successful DB insert
            window.location.href = "/success";
          } catch (error) {
            console.error("Order saving error:", error);

            alert(
              "Payment was completed, but we could not confirm your order was saved. Please contact support with your payment ID: " +
                response.razorpay_payment_id
            );
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razor = new window.Razorpay(options);

      razor.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);

        alert(
          response.error.description ||
            "Payment failed. Please try again."
        );

        setLoading(false);
      });

      razor.open();
    } catch (error) {
      console.error("Payment initialization error:", error);

      alert(
        error.message ||
          "Something went wrong. Please try again."
      );

      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Order Now
      </h1>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="border p-3 w-full mb-3"
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-3 w-full mb-3"
      />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        className="border p-3 w-full mb-3"
      />

      <textarea
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        className="border p-3 w-full mb-3"
      />

      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
        className="border p-3 w-full mb-3"
      />

      <input
        name="state"
        placeholder="State"
        value={form.state}
        onChange={handleChange}
        className="border p-3 w-full mb-3"
      />

      <input
        name="pincode"
        placeholder="Pincode"
        value={form.pincode}
        onChange={handleChange}
        className="border p-3 w-full mb-3"
      />

      <button
        onClick={payNow}
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay ₹900"}
      </button>
    </div>
  );
}
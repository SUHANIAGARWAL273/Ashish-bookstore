"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = "/admin";
    } else {
      alert("Wrong Password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white border-2 border-black p-8 rounded-2xl w-full max-w-md">

        <h1 className="text-4xl font-extrabold text-black mb-6 text-center">
          Admin Login
        </h1>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-black p-4 w-full rounded-xl text-black font-semibold"
        />

        <button
          onClick={handleLogin}
          className="mt-4 w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-yellow-500 hover:text-black transition"
        >
          Login
        </button>

      </div>

    </div>
  );
}
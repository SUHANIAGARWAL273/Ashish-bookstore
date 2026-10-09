"use client";

import { useState } from "react";
import Link from "next/link";

export default function SuccessPage() {
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function getDownloadLink() {
    setLoading(true);

    const res = await fetch("/api/download");
    const data = await res.json();

    setDownloadUrl(data.url);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="bg-white border-2 border-black rounded-3xl shadow-xl p-10 max-w-2xl w-full text-center">

        <div className="text-7xl mb-6">
          ✅
        </div>

        <h1 className="text-5xl font-extrabold text-black mb-4">
          Payment Successful
        </h1>

        <p className="text-xl font-semibold text-black mb-3">
          Thank You For Your Purchase!
        </p>

        <p className="text-black text-lg leading-8 mb-8">
          Your order for
          <span className="font-bold">
            {" "}Physiology Gold Standard Notes
          </span>
          {" "}has been received successfully.
        </p>

        <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-5 mb-8">

          <p className="text-black font-bold text-lg">
            Volume 1 + Volume 2
          </p>

          <p className="text-green-600 text-4xl font-extrabold mt-2">
            ₹900 Paid
          </p>

        </div>

        {/* DOWNLOAD BUTTON */}

        {!downloadUrl ? (
          <button
            onClick={getDownloadLink}
            disabled={loading}
            className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition mb-6"
          >
            {loading ? "Preparing Download..." : "Download Your Books"}
          </button>
        ) : (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition mb-6"
          >
            Open PDF
          </a>
        )}

        <div className="flex flex-col md:flex-row gap-4 justify-center">

          <Link
            href="/"
            className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-yellow-500 hover:text-black transition"
          >
            Back To Home
          </Link>

          <a
            href="tel:8000565082"
            className="border-2 border-black text-black px-8 py-4 rounded-xl font-bold hover:bg-black hover:text-white transition"
          >
            Contact Support
          </a>

        </div>

      </div>

    </div>
  );
}
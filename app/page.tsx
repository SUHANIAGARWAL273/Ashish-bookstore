  import Link from "next/link";
  import Image from "next/image";
  import { FaPhoneAlt, FaInstagram } from "react-icons/fa";
  import { MdEmail } from "react-icons/md";

  export default function Home() {
    return (
      <main className="min-h-screen bg-white">
        
        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

            <div>
              <h2 className="font-bold text-2xl text-black">
                Physiology Notes
              </h2>

              <p className="text-sm text-gray-600">
                Dr. Ashish Agarwal
              </p>
            </div>

            <div className="hidden md:flex gap-8 font-medium text-gray-700">
              <a href="#about" className="hover:text-black transition">
                About
              </a>

              <a href="#reviews" className="hover:text-black transition">
                Reviews
              </a>

              <a href="#contact" className="hover:text-black transition">
                Contact
              </a>
            </div>

            <Link
              href="/order"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition duration-300"
            >
              Buy Now
            </Link>

          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="bg-gradient-to-r from-yellow-50 to-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-6">

            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* LEFT SIDE */}
              <div>
                <h1 className="text-6xl md:text-7xl font-extrabold text-black mb-4">
                  Physiology
                  Gold Standard Notes
                </h1>

                <p className="text-2xl text-gray-700 mb-4">
                  By Dr. Ashish Agarwal
                </p>

                <p className="text-lg text-gray-600 mb-6">
                  Volume 1 + Volume 2
                </p>

                <div className="text-5xl font-bold text-green-600 mb-8">
                  ₹900
                </div>

                <Link
                  href="/order"
                  className="inline-block bg-black text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-yellow-500 hover:text-black transition-all duration-300 shadow-lg"
                >
                  Buy Now
                </Link>
                <p className="mt-4 text-gray-600 font-medium">
                  Trusted by Medical Students Across India 🇮🇳
                </p>

                {/* FEATURES */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl shadow text-center font-medium text-gray-800">
                    📖 Concept Based
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl shadow text-center font-medium text-gray-800">
                    🎯 Exam Oriented
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl shadow text-center font-medium text-gray-800">
                    🧠 Easy Language
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl shadow text-center font-medium text-gray-800">
                    🏆 Trusted Notes
                  </div>

                </div>
              </div>

              {/* RIGHT SIDE BOOKS */}
              <div className="flex justify-center items-center gap-6 flex-wrap">

                <Image
                  src="https://d117z51sy2soxm.cloudfront.net/book+vol1..png"
                  alt="Volume 1"
                  width={240}
                  height={340}
                  className="rounded-xl shadow-2xl hover:scale-105 transition"
                />

                <Image
                  src="https://d117z51sy2soxm.cloudfront.net/book+vol+2..png"
                  alt="Volume 2"
                  width={240}
                  height={340}
                  className="rounded-xl shadow-2xl hover:scale-105 transition"
                />

              </div>

            </div>

          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">

            <div className="grid md:grid-cols-2 gap-16 items-center">

              {/* IMAGE */}
              <div className="flex justify-center">
                <Image
                  src="/bhaiya.png"
                  alt="Dr Ashish Agarwal"
                  width={450}
                  height={600}
                  className="drop-shadow-2xl"
                />
              </div>

              {/* CONTENT */}
              <div>

                <h2 className="text-5xl font-extrabold text-black mb-6">
                  About Dr. Ashish Agarwal
                </h2>

                <p className="text-lg text-gray-700 leading-8 mb-6">
                  Dr. Ashish Agarwal is dedicated to simplifying physiology
                  for medical students. His teaching approach focuses on
                  conceptual clarity, long-term retention and exam-oriented
                  preparation.
                </p>

                <p className="text-lg text-gray-700 leading-8 mb-6">
                  These Gold Standard Notes have helped thousands of students
                  understand difficult physiology concepts in a simple,
                  structured and memorable way.
                </p>

                <div className="grid grid-cols-2 gap-6 mt-8">

                  <div className="bg-yellow-100 border border-yellow-300 p-5 rounded-xl shadow">
                    <h3 className="text-3xl font-bold text-black">
                      1000+
                    </h3>

                    <p className="text-gray-800">
                      Students Benefited
                    </p>
                  </div>

                  <div className="bg-yellow-100 border border-yellow-300 p-5 rounded-xl shadow">
                    <h3 className="text-3xl font-bold text-black">
                      2 Volumes
                    </h3>

                    <p className="text-gray-800">
                      Complete Coverage
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="reviews" className="bg-gray-50 py-24">

          <div className="max-w-6xl mx-auto px-6">

            <h2 className="text-5xl font-extrabold text-black text-center mb-12">
              What Students Say
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <p className="text-gray-700">
                  Very easy to understand. Helped me revise physiology quickly
                  before exams.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <p className="text-gray-700">
                  The flowcharts and concept explanations are extremely useful
                  for retention.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <p className="text-gray-700">
                  One of the best physiology resources for first-year medical
                  students.
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="bg-white py-24"
        >
          <div className="max-w-6xl mx-auto px-6">

            <h2 className="text-5xl font-extrabold text-black text-center mb-12">
              Contact Us
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="bg-yellow-100 border border-yellow-300 p-8 rounded-2xl shadow-md text-center">
                <h3 className="font-bold text-xl text-black mb-3 flex items-center justify-center gap-2">
                  <FaPhoneAlt className="text-yellow-600" />
                  Phone
                </h3>

                <p className="text-gray-800 font-medium">
                  <a
                    href="tel:8000565082"
                    className="hover:underline"
                  >
                    8000565082
                  </a>
                </p>
              </div>

              <div className="bg-yellow-100 border border-yellow-300 p-8 rounded-2xl shadow-md text-center">
                <h3 className="font-bold text-xl text-black mb-3 flex items-center justify-center gap-2">
                  <MdEmail className="text-red-500 text-2xl" />
                  Email
                </h3>

                <p className="text-gray-800 font-medium break-all">
                  <a
                    href="mailto:ashishagrawal4049@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    ashishagrawal4049@gmail.com
                  </a>
                </p>
              </div>

              <div className="bg-yellow-100 border border-yellow-300 p-8 rounded-2xl shadow-md text-center">
                <h3 className="font-bold text-xl text-black mb-3 flex items-center justify-center gap-2">
                  <FaInstagram className="text-pink-600 text-2xl" />
                  Instagram
                </h3>

                <p className="text-gray-800 font-medium">
                  <a
                    href="https://instagram.com/dr.ashish_agrawal_lectures"
                    target="_blank"
                    className="text-pink-600 font-medium hover:underline"
                  >
                    @dr.ashish_agrawal_lectures
                  </a>
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-black text-white py-24">

          <div className="max-w-4xl mx-auto text-center px-6">

            <h2 className="text-5xl font-bold mb-6">
              Get Your Copy Today
            </h2>

            <p className="text-xl mb-8">
              Physiology Gold Standard Notes
              <br />
              Volume 1 + Volume 2
            </p>

            <div className="text-5xl font-bold text-yellow-400 mb-8">
              ₹900
            </div>

            <Link
              href="/order"
              className="inline-block bg-yellow-400 text-black px-10 py-4 rounded-xl text-lg font-bold hover:scale-105 transition"
            >
              Buy Now
            </Link>

          </div>

        </section>

        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-6 text-center">

            <h3 className="font-bold text-xl mb-2">
              Physiology Gold Standard Notes
            </h3>

            <p className="text-gray-400">
              © 2026 Dr. Ashish Agarwal. All Rights Reserved.
            </p>

          </div>
        </footer>

      </main>
    );
  }